-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema hairb2b
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema hairb2b
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `hairb2b` DEFAULT CHARACTER SET utf8 ;
USE `hairb2b` ;

-- -----------------------------------------------------
-- Table `hairb2b`.`trn_gallery`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hairb2b`.`trn_gallery` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `path` VARCHAR(500) CHARACTER SET 'utf8' NOT NULL,
  `profile_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_trn_gallery_1_idx` (`profile_id` ASC),
  CONSTRAINT `fk_trn_gallery_1`
    FOREIGN KEY (`profile_id`)
    REFERENCES `hairb2b`.`trn_profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_latvian_ci;


-- -----------------------------------------------------
-- Table `hairb2b`.`trn_user_account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hairb2b`.`trn_user_account` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(150) CHARACTER SET 'utf8' NOT NULL,
  `password` VARCHAR(150) CHARACTER SET 'utf8' NOT NULL,
  `is_verified` TINYINT(1) NOT NULL,
  `name` VARCHAR(100) CHARACTER SET 'utf8' NOT NULL,
  `is_active` TINYINT(1) NOT NULL,
  `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_updated_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_seen` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_latvian_ci;


-- -----------------------------------------------------
-- Table `hairb2b`.`trn_profile_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hairb2b`.`trn_profile_type` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(150) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_latvian_ci;


-- -----------------------------------------------------
-- Table `hairb2b`.`trn_profile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hairb2b`.`trn_profile` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `profile_type` INT(11) NOT NULL,
  `is_active` TINYINT(1) NOT NULL,
  `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `profile_pic` INT(11) NULL DEFAULT NULL,
  `rating` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_trn_profile_2_idx` (`profile_type` ASC),
  INDEX `fk_trn_profile_1` (`user_id` ASC),
  INDEX `fk_profile_pic` (`profile_pic` ASC),
  CONSTRAINT `fk_profile_pic`
    FOREIGN KEY (`profile_pic`)
    REFERENCES `hairb2b`.`trn_gallery` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_trn_profile_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `hairb2b`.`trn_user_account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trn_profile_2`
    FOREIGN KEY (`profile_type`)
    REFERENCES `hairb2b`.`trn_profile_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_latvian_ci;


-- -----------------------------------------------------
-- Table `hairb2b`.`trn_job_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hairb2b`.`trn_job_role` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `role` VARCHAR(100) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_latvian_ci;


-- -----------------------------------------------------
-- Table `hairb2b`.`trn_stylist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hairb2b`.`trn_stylist` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `profile_id` INT(11) NOT NULL,
  `job_role` INT(11) NOT NULL,
  `default_payment_gateway_id` INT(11) NULL DEFAULT NULL,
  `first_name` VARCHAR(100) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `last_name` VARCHAR(100) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `address_line_1` VARCHAR(100) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `address_line_2` VARCHAR(100) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `city` VARCHAR(100) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `state` VARCHAR(100) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `zip` INT(11) NULL DEFAULT NULL,
  `country` VARCHAR(100) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `telephone` INT(11) NULL DEFAULT NULL,
  `description` VARCHAR(2000) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `terms_and_conditions` VARCHAR(2000) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_trn_stylist_1_idx` (`profile_id` ASC),
  INDEX `fk_trn_stylist_2_idx` (`job_role` ASC),
  CONSTRAINT `fk_trn_stylist_1`
    FOREIGN KEY (`profile_id`)
    REFERENCES `hairb2b`.`trn_profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trn_stylist_2`
    FOREIGN KEY (`job_role`)
    REFERENCES `hairb2b`.`trn_job_role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_latvian_ci;


-- -----------------------------------------------------
-- Table `hairb2b`.`trn_time_slot`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hairb2b`.`trn_time_slot` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_latvian_ci;


-- -----------------------------------------------------
-- Table `hairb2b`.`trn_busy_date`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hairb2b`.`trn_busy_date` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `stylist_id` INT(11) NOT NULL,
  `time_slot_id` INT(11) NOT NULL,
  `type` VARCHAR(50) CHARACTER SET 'utf8' NOT NULL,
  `date` DATE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_trn_busy_date_1_idx` (`stylist_id` ASC),
  INDEX `fk_trn_busy_date_2_idx` (`time_slot_id` ASC),
  CONSTRAINT `fk_trn_busy_date_1`
    FOREIGN KEY (`stylist_id`)
    REFERENCES `hairb2b`.`trn_stylist` (`profile_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trn_busy_date_2`
    FOREIGN KEY (`time_slot_id`)
    REFERENCES `hairb2b`.`trn_time_slot` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_latvian_ci;


-- -----------------------------------------------------
-- Table `hairb2b`.`trn_charge_per_slot`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hairb2b`.`trn_charge_per_slot` (
  `stylist_id` INT(11) NOT NULL,
  `time_slot_id` INT(11) NOT NULL,
  `charge` DECIMAL(10,2) NOT NULL,
  `currency` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`stylist_id`, `time_slot_id`),
  INDEX `fk_trn_charge_per_slot_2_idx` (`time_slot_id` ASC),
  CONSTRAINT `fk_trn_charge_per_slot_1`
    FOREIGN KEY (`stylist_id`)
    REFERENCES `hairb2b`.`trn_stylist` (`profile_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trn_charge_per_slot_2`
    FOREIGN KEY (`time_slot_id`)
    REFERENCES `hairb2b`.`trn_time_slot` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_latvian_ci;


-- -----------------------------------------------------
-- Table `hairb2b`.`trn_location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hairb2b`.`trn_location` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `city` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `state` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_latvian_ci;


-- -----------------------------------------------------
-- Table `hairb2b`.`trn_preferred_location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hairb2b`.`trn_preferred_location` (
  `stylist_id` INT(11) NOT NULL,
  `location_id` INT(11) NOT NULL,
  PRIMARY KEY (`stylist_id`, `location_id`),
  INDEX `fk_trn_preferred_location_2_idx` (`location_id` ASC),
  CONSTRAINT `fk_trn_preferred_location_1`
    FOREIGN KEY (`stylist_id`)
    REFERENCES `hairb2b`.`trn_stylist` (`profile_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trn_preferred_location_2`
    FOREIGN KEY (`location_id`)
    REFERENCES `hairb2b`.`trn_location` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_latvian_ci;


-- -----------------------------------------------------
-- Table `hairb2b`.`trn_salon`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hairb2b`.`trn_salon` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `profile_id` INT(11) NOT NULL,
  `profile_pic` INT(11) NOT NULL,
  `address_line_1` VARCHAR(100) CHARACTER SET 'utf8' NOT NULL,
  `address_line_2` VARCHAR(100) CHARACTER SET 'utf8' NOT NULL,
  `city` VARCHAR(100) CHARACTER SET 'utf8' NOT NULL,
  `state` VARCHAR(100) CHARACTER SET 'utf8' NOT NULL,
  `zip` INT(11) NOT NULL,
  `country` VARCHAR(100) CHARACTER SET 'utf8' NOT NULL,
  `telephone` INT(11) NOT NULL,
  `description` VARCHAR(2000) CHARACTER SET 'utf8' NOT NULL,
  `salon_name` VARCHAR(100) CHARACTER SET 'utf8' NOT NULL,
  `owner_name` VARCHAR(100) CHARACTER SET 'utf8' NOT NULL,
  `ABN` VARCHAR(100) CHARACTER SET 'utf8' NOT NULL,
  `g_loc_longitude` DOUBLE NOT NULL,
  `g_loc_latitude` DOUBLE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_trn_salon_1_idx` (`profile_id` ASC),
  CONSTRAINT `fk_trn_salon_1`
    FOREIGN KEY (`profile_id`)
    REFERENCES `hairb2b`.`trn_profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_latvian_ci;


-- -----------------------------------------------------
-- Table `hairb2b`.`trn_skill`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hairb2b`.`trn_skill` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `parent_id` INT(11) NOT NULL,
  `description` VARCHAR(100) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_latvian_ci;


-- -----------------------------------------------------
-- Table `hairb2b`.`trn_stylist_skill`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hairb2b`.`trn_stylist_skill` (
  `stylist_id` INT(11) NOT NULL,
  `skill_id` INT(11) NOT NULL,
  PRIMARY KEY (`stylist_id`, `skill_id`),
  INDEX `fk_trn_stylist_skill_2_idx` (`skill_id` ASC),
  CONSTRAINT `fk_trn_stylist_skill_1`
    FOREIGN KEY (`stylist_id`)
    REFERENCES `hairb2b`.`trn_stylist` (`profile_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trn_stylist_skill_2`
    FOREIGN KEY (`skill_id`)
    REFERENCES `hairb2b`.`trn_skill` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_latvian_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;