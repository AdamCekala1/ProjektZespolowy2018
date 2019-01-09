<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Entity(repositoryClass="App\Repository\AnswerRepository")
 */
class Answer implements Editable
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Serializer\Type("int")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Serializer\Type("string")
     */
    private $content;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\question", inversedBy="answers", cascade={"persist"})
     * @ORM\JoinColumn(nullable=false , referencedColumnName="id", onDelete="CASCADE")
     * @Serializer\Type("ArrayCollection<App\Entity\Question>")
     */
    private $question;

//    /**
//     * @ORM\OneToMany(targetEntity="App\Entity\Response", mappedBy="answer", orphanRemoval=true)
//     */
//    private $responses;
//
//    public function __construct()
//    {
//        $this->responses = new ArrayCollection();
//    }

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

    public function getQuestion(): ?question
    {
        return $this->question;
    }

    public function setQuestion(?question $question): self
    {
        $this->question = $question;

        return $this;
    }

    public function getQuestionnaire(): Questionnaire
    {
        return $this->question->getQuestionnaire();
    }

//    /**
//     * @return Collection|Response[]
//     */
//    public function getResponses(): Collection
//    {
//        return $this->responses;
//    }
//
//    public function addResponse(Response $response): self
//    {
//        if (!$this->responses->contains($response)) {
//            $this->responses[] = $response;
//            $response->setAnswer($this);
//        }
//
//        return $this;
//    }
//
//    public function removeResponse(Response $response): self
//    {
//        if ($this->responses->contains($response)) {
//            $this->responses->removeElement($response);
//            // set the owning side to null (unless already changed)
//            if ($response->getAnswer() === $this) {
//                $response->setAnswer(null);
//            }
//        }
//
//        return $this;
//    }
}
