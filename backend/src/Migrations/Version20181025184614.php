<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20181025184614 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        $this->addSql('CREATE SEQUENCE user_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, name VARCHAR(255) NOT NULL, surname VARCHAR(255) DEFAULT NULL, token VARCHAR(255) DEFAULT NULL, city VARCHAR(255) NOT NULL, age INT NOT NULL, sex INT NOT NULL, role VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON "user" (email)');
    }

    public function down(Schema $schema) : void
    {
        $this->addSql('DROP SEQUENCE user_id_seq CASCADE');
        $this->addSql('DROP TABLE "user"');
    }
}
