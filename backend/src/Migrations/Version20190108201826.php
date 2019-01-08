<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190108201826 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE questionnaire ADD owner_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE questionnaire ADD CONSTRAINT FK_7A64DAF7E3C61F9 FOREIGN KEY (owner_id) REFERENCES account (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_7A64DAF7E3C61F9 ON questionnaire (owner_id)');
        $this->addSql('ALTER TABLE question DROP CONSTRAINT FK_B6F7494ECE07E8FF');
        $this->addSql('ALTER TABLE question ALTER content TYPE TEXT');
        $this->addSql('ALTER TABLE question ALTER content DROP DEFAULT');
        $this->addSql('ALTER TABLE question ADD CONSTRAINT FK_B6F7494ECE07E8FF FOREIGN KEY (questionnaire_id) REFERENCES questionnaire (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE questionnaire DROP CONSTRAINT FK_7A64DAF7E3C61F9');
        $this->addSql('DROP INDEX IDX_7A64DAF7E3C61F9');
        $this->addSql('ALTER TABLE questionnaire DROP owner_id');
        $this->addSql('ALTER TABLE question DROP CONSTRAINT fk_b6f7494ece07e8ff');
        $this->addSql('ALTER TABLE question ALTER content TYPE VARCHAR(255)');
        $this->addSql('ALTER TABLE question ALTER content DROP DEFAULT');
        $this->addSql('ALTER TABLE question ADD CONSTRAINT fk_b6f7494ece07e8ff FOREIGN KEY (questionnaire_id) REFERENCES questionnaire (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }
}
