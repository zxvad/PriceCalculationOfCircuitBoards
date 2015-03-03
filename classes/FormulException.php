<?
class FormulException extends Exception
{
    public $message;
    public $code;
    public $file;
    public $line;

    public function __construct($errno, $errstr, $errfile, $errline)
    {
        parent::__construct();
        $this->code = $errno;
        $this->message = $errstr;
        $this->file = $errfile;
        $this->line = $errline;
    }

    public function writeIntoLog()
    {
        $f = fopen('log.txt', 'a');
        if (!empty($f)) {
            $this->file = str_replace($_SERVER['DOCUMENT_ROOT'], '', $this->file);
            $err = "$this->message =  $this->file = $this->line\r\n";
            fwrite($f, $err);
            fclose($f);
        }
    }
}
function err2exc($errno, $errstr, $errfile, $errline) {
    throw new FormulException($errno, $errstr, $errfile, $errline);
}

set_error_handler('err2exc', E_ALL & ~E_NOTICE &~ E_USER_NOTICE | E_STRICT);
error_reporting(E_ALL | E_STRICT);