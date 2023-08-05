import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { PaginationState, SortingState } from "@tanstack/react-table";

export default function usePagination() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamKeys = searchParams.keys();

  const page = searchParams?.get("page") ?? "1";
  const per_page = searchParams?.get("per_page") ?? "10";
  const sort = searchParams?.get("sort");
  const [column, order] = sort?.split(".") ?? [];

  // Create query string
  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: Number(page) - 1,
    pageSize: Number(per_page),
  });

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: column ?? "",
      desc: order === "desc",
    },
  ]);
    const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );


  useEffect(() => {
    setPagination({
      pageIndex: Number(page) - 1,
      pageSize: Number(per_page),
    });
  }, [page, per_page]);


  useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        page: pageIndex + 1,
        per_page: pageSize,
      })}`
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize]);

  useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        page,
        sort: sorting[0]?.id
          ? `${sorting[0]?.id}.${sorting[0]?.desc ? "desc" : "asc"}`
          : null,
      })}`
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);


  return {
    searchParams,
    searchParamKeys,
    page,
per_page,
sort,
    pageIndex,
    pageSize,
    sorting,
    setSorting,

    pagination,
    setPagination,

    createQueryString
  }
}
