CREATE TABLE IF NOT EXISTS DBNAME.`showroom_detail` (
`id` int(10) NOT NULL,
  `url` varchar(15) NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS DBNAME.`showroom_info` (
`id` int(10) NOT NULL,
  `ip` varchar(15) NOT NULL,
  `device` text NOT NULL,
  `time` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS DBNAME.`showroom_view` (
`id` int(10) NOT NULL,
  `view` int(10) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE DBNAME.`showroom_detail`
 ADD PRIMARY KEY (`id`);

ALTER TABLE DBNAME.`showroom_info`
 ADD PRIMARY KEY (`id`);

ALTER TABLE DBNAME.`showroom_view`
 ADD PRIMARY KEY (`id`);

ALTER TABLE DBNAME.`showroom_detail`
MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

ALTER TABLE DBNAME.`showroom_info`
MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

ALTER TABLE DBNAME.`showroom_view`
MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
