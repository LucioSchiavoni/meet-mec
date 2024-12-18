/*
  Warnings:

  - You are about to drop the column `fecha_fin` on the `Eventos` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_init` on the `Eventos` table. All the data in the column will be lost.
  - Added the required column `fecha` to the `Eventos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hora_fin` to the `Eventos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hora_ini` to the `Eventos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Eventos` DROP COLUMN `fecha_fin`,
    DROP COLUMN `fecha_init`,
    ADD COLUMN `fecha` DATETIME(3) NOT NULL,
    ADD COLUMN `hora_fin` DATETIME(3) NOT NULL,
    ADD COLUMN `hora_ini` DATETIME(3) NOT NULL;
