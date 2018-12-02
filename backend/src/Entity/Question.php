<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Entity(repositoryClass="App\Repository\QuestionRepository")
 */
class Question
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Serializer\Type("int")
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Serializer\Type("string")
     */
    private $content;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Answer", mappedBy="question",  cascade={"persist"} ,orphanRemoval=true)
     * @Serializer\Type("ArrayCollection<App\Entity\Answer>")
     */
    private $answers;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Questionnaire", inversedBy="question", cascade={"persist"})
     * @ORM\JoinColumn(nullable=false, referencedColumnName="id", onDelete="CASCADE", nullable=false)
     * @Serializer\Type("ArrayCollection<App\Entity\Questionnaire>")
     */
    private $questionnaire;

    public function __construct()
    {
        $this->answers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    /**
     * @return Collection|Answer[]
     */
    public function getAnswers(): Collection
    {
        return $this->answers;
    }

    public function addAnswer(Answer $answer): self
    {
        if (!$this->answers->contains($answer)) {
            $this->answers[] = $answer;
            $answer->setQuestion($this);
        }

        return $this;
    }

    public function removeAnswer(Answer $answer): self
    {
        if ($this->answers->contains($answer)) {
            $this->answers->removeElement($answer);
            // set the owning side to null (unless already changed)
            if ($answer->getQuestion() === $this) {
                $answer->setQuestion(null);
            }
        }

        return $this;
    }

//    public function getQuestionnaire(): ?Questionnaire
//    {
//        return $this->questionnaire;
//    }

    public function setQuestionnaire(?Questionnaire $questionnaire): self
    {
        $this->questionnaire = $questionnaire;

        return $this;
    }
}
