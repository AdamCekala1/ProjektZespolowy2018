<?php

namespace App\Repository;

use App\Entity\Response;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Response|null find($id, $lockMode = null, $lockVersion = null)
 * @method Response|null findOneBy(array $criteria, array $orderBy = null)
 * @method Response[]    findAll()
 * @method Response[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ResponseRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Response::class);
    }

    /**
     * @return Response[] Returns an array of Response objects
     */
    public function findByQuestionnaire(int $questionnaire)
    {
        return $this->createQueryBuilder('r')
            ->innerJoin('r.question','q')
            ->innerJoin('q.questionnaire','questionnaire')
            ->andWhere('questionnaire.id = :val')
            ->setParameter('val', $questionnaire)
            ->getQuery()
            ->getResult();
    }

}
