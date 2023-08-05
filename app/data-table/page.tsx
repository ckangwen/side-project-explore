// https://github.com/shadcn-ui/ui/tree/main/apps/www/app/examples/tasks

import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./components/column";
import tasks from "./components/tasks.json"

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default function Page(props: PageProps) {
  const { searchParams } = props
  const limit = Number(searchParams.limit) || 10

  return (
    <main className="w-screen h-screen box-border px-4 py-6">
      <DataTable columns={columns} data={tasks} total={tasks.length}></DataTable>
    </main>
  )
}