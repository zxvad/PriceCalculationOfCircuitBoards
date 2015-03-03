class {'nullmailer':
  remoterelay => "smtp.gmail.com",
  remoteopts => "--user=<mailbox>@gmail.com --pass=<password> --ssl",
}