-- CreateTable
CREATE TABLE `Eventos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_organizador` VARCHAR(191) NULL,
    `nombre_evento` VARCHAR(191) NULL,
    `fecha_init` DATETIME(3) NOT NULL,
    `fecha_fin` DATETIME(3) NOT NULL,
    `observacion` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `rol` ENUM('ADMIN', 'USER') NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
