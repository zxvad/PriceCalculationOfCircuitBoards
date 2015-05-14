DROP TABLE IF EXISTS `calculation`;
CREATE TABLE `calculation` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`title` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(60) NOT NULL,
	`role` enum('USER', 'ADMIN') default NULL,
	`password_hash` VARCHAR(60) DEFAULT NULL,
	`firstname` VARCHAR(50) NULL DEFAULT NULL,
	`lastname` VARCHAR(50) NULL DEFAULT NULL,
	`dep` integer,
  `added_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB;

DROP TABLE IF EXISTS `input_param`;
CREATE TABLE `input_param` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`formula_id` INT(11) NOT NULL,
	`type` enum('input', 'select') default NULL,
	`value` text,
	`added_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB;

DROP TABLE IF EXISTS `output_param`;
CREATE TABLE `output_param` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`formula_id` INT(11) NOT NULL,
	`added_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB;

DROP TABLE IF EXISTS `formula`;
CREATE TABLE `formula` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`operation` VARCHAR(3) default NULL,
	`type` enum('constant', 'input', 'calc', 'formula') default 'formula',
	`variable` VARCHAR(50) NOT NULL,
	`title` VARCHAR(50) NULL DEFAULT NULL,
	`expression` TEXT,
	`tech_proc` VARCHAR(3) default NULL,
  `added_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `added_by` integer NOT NULL,
	PRIMARY KEY (`id`)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB;