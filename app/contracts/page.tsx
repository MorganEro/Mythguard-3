import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { fetchAllContracts } from '@/actions/contract/contract-server-actions';
import SectionTitle from '@/components/global/SectionTitle';
import EmptyList from '@/components/global/EmptyList';
import { AddNewButton, IconButton } from '@/components/form/Button';
import { deleteContractAction } from '@/actions/contract/contract-server-actions';
import FormContainer from '@/components/form/FormContainer';
import { formatDate } from '@/lib/format';
import { MAX_CONTRACTS_PER_USER } from '@/lib/utils/constants';

async function ContractsPage() {
  const contracts = await fetchAllContracts();
 
  if ('message' in contracts) {
    return (
      console.error(contracts.message)
    );
  }
  const totalContracts = contracts.length;

  function DeleteContract({ contractId }: { contractId: string }) {
    const deleteContract = deleteContractAction.bind(null, { contractId });
    return (
      <FormContainer action={deleteContract}>
        <IconButton actionType="delete" />
      </FormContainer>
    );
  }

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
              <p className="text-muted-foreground">
                You currently have <span className="font-bold">{totalContracts}/{MAX_CONTRACTS_PER_USER}</span> contracts.
              </p>
              {totalContracts < MAX_CONTRACTS_PER_USER && (
                <AddNewButton href="/contracts/create" />
              )}
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
                    <Card className="transform group-hover:shadow-xl transition-shadow duration-500 h-full">
                      <CardContent className="p-8 gap-y-4 flex flex-col md:flex-row items-center h-full relative">
                        <Link href={`/contracts/${contractId}`}>
                          <div className="flex flex-col p-4 gap-y-2 md:gap-y-4">
                            <h2 className="text-2xl font-semibold capitalize text-primary mb-2">
                              {name}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-x-4">
                              <p>
                                Starts: <strong>{formatDate(startDate)}</strong>
                              </p>
                              <p>
                                Ends: <strong>{formatDate(endDate)}</strong>
                              </p>
                            </div>
                            <p>{description}</p>
                            <div className="grid gap-x-4 text-muted-foreground my-4">
                              <p>
                                Created: {formatDate(createdAt)}
                              </p>
                              {isUpdated &&
                                <p>
                                  Last Updated: {formatDate(updatedAt)}
                                </p>
                              }
                            </div>

                          </div>
                        </Link>
                          <div className="flex gap-2 mt-2 items-end justify-end absolute bottom-6 md:bottom-10 right-6 md:right-10">
                            <Link href={`/contracts/${contractId}/edit`}>
                              <IconButton actionType="edit" />
                            </Link>
                            <DeleteContract contractId={contractId} />
                          </div>
                      </CardContent>
                    </Card>
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
