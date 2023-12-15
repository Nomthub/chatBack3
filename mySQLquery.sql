#create database Build3Bot;

use Build3Bot;

alter table `BuildStatus`
add foreign key (`fk-user-id`) references `Userz`(`user-id`); 

alter table `BuildStatus` 
add column `fk-user-id` int not null; 

create table `Userz` 
(
`name` varchar(255),
`password` varchar(255),
`user-id` int not null auto_increment,
primary key (`user-id`)
);

CREATE TABLE `BuildStatus`
(
    `status_id` INT NOT NULL AUTO_INCREMENT,
    `s_text` TEXT,
    `time_status` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     PRIMARY KEY ( `status_id` )
);

