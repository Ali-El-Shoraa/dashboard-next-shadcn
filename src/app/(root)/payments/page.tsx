import { getDataPayments } from "@/components/tables/payments/getDataPayments";
import { columns } from "../../../components/tables/payments/columns";
import { DataTable } from "../../../components/tables/payments/data-table";

export default async function PaymentsPage() {
  const data = await getDataPayments();

  return (
    <div className="">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
