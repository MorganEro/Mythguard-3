import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { fetchAllContracts } from '@/actions/contract/contract-server-actions';
import SectionTitle from '@/components/global/SectionTitle';
import EmptyList from '@/components/global/EmptyList';

async function ContractsPage() {
  const contracts = await fetchAllContracts();
  
  if ('message' in contracts ) {
    return (
     console.error(contracts.message)
    );
  }
  const totalContracts = contracts.length;
  
  return (
    <section>
        <SectionTitle text="Contracts" />
      {/* CONTRACTS */}
      <div>
        {totalContracts === 0 ? (
         <EmptyList heading="You have no contracts" />
        ) : (
          <>
            <div className="flex items-center justify-between mt-8">
              <p className="font-semibold">
                You currently have {totalContracts}/5 contracts.
              </p>
            </div>
            <div className="mt-12 grid lg:grid-cols-2 gap-8">

              {contracts.map(contract => {
                const { name, description, startDate, endDate, createdAt, updatedAt } = contract;
                const contractId = contract.id;
                const createdAtDate = new Date(createdAt).getTime();
                const updatedAtDate = new Date(updatedAt).getTime();
                const isUpdated = createdAtDate !== updatedAtDate;

                return (
                  <article
                  key={contractId}
                  className="group">
                    <Link href={`/contracts/${contractId}`}>
                      <Card className="transform group-hover:shadow-xl transition-shadow duration-500 h-full">
                        <CardContent className="p-8 gap-y-4 flex flex-col md:flex-row items-center h-full">
                          <div className="flex flex-col p-4 gap-y-2 md:gap-y-4 flex-grow">
                            <h2 className="text-2xl font-semibold capitalize text-primary">
                              {name}
                            </h2>
                           <div className="grid md:grid-cols-2 gap-x-4">
                           <p>
                              Start Date: <strong>{startDate.toLocaleDateString()}</strong>
                            </p>
                            <p>
                              End Date: <strong>{endDate.toLocaleDateString()}</strong>
                            </p>
                           </div>
                            <p>{description}</p>
                           <div className="grid gap-x-4 text-muted-foreground mt-4">
                           <p>
                              Created: {createdAt.toLocaleDateString()}
                            </p>
                              {isUpdated &&
                            <p>
                              Last Updated: {updatedAt.toLocaleDateString()}
                            </p>
                            }
                           </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
export default ContractsPage;
