server {
    charset      utf-8;
    client_max_body_size  128M;

    # VirtualBox has an issue with sendfile (it can serve broken file contents)
    # so we are turning it off
    sendfile off;

    rewrite_log on; # for debugging

    listen 80;

    server_name my.boards.com;

    root /var/www/project/admin/backend/web;
    index index.php;

    access_log   /var/log/nginx/boards.access.log;
    error_log    /var/log/nginx/boards.error.log debug;

    location / {
        try_files $uri $uri/ /index.php$is_args$args;
    }

    location /admin/api {
        # Make sure alias path does not contain location part,
        # because if it does, try_files will work incorrectly!
        # A reason is that bug: http://trac.nginx.org/nginx/ticket/97
        alias /var/www/project/admin/backend/web;

        try_files $uri $uri/ /index.php$is_args$args;
    }

    location /admin {
        alias /var/www/project/admin/frontend;

        expires -1;
        add_header Pragma "no-cache";
        add_header Cache-Control "no-store, no-cache, must-revalidate, post-check=0, pre-check=0";

        index index.html;

        try_files $uri $uri/ /index.html =404;
    }

    location ~ \.php$ {
        # Remove /admin/api from the beginning of $fastcgi_script_name
        # Btw, cgi.fix_path_info = 0 in php.ini is required for safety
        fastcgi_split_path_info ^/admin/api(.+?\.php)(.*)$;

        # Change root if we are under /admin/api
        # PS: ifs are evil, but there is no other way
        if ($request_uri ~ "^/admin/api") {
            root /var/www/project/admin/backend/web;
        }

        include fastcgi.conf;

        # Return 404 if script does not exist
        # This should happen only when we came to this location from /admin/api
        # PS: ifs are evil, but there is no other way
        if (!-f $document_root$fastcgi_script_name) {
            return 404;
            break;
        }

        fastcgi_read_timeout 600;
        fastcgi_pass  unix:/var/run/php5-fpm.sock; ## listen for socket
    }

    location ~ ^\.(ht|svn|git) {
        deny all;
    }
}
