import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_RowVirtualizer,
  type MRT_SortingState
} from 'mantine-react-table'
import 'mantine-react-table/styles.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { makeData, type Person } from '../shainIdKnri/makeData'

const TableData = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name'
      },
      {
        accessorKey: 'middleName',
        header: 'Middle Name'
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name'
      },
      {
        accessorKey: 'email',
        header: 'Email Address'
      },
      {
        accessorKey: 'address',
        header: 'Address'
      },
      {
        accessorKey: 'zipCode',
        header: 'Zip Code'
      },
      {
        accessorKey: 'city',
        header: 'City'
      },
      {
        accessorKey: 'state',
        header: 'State'
      },
      {
        accessorKey: 'country',
        header: 'Country'
      }
    ],
    []
  )

  const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null)

  const [data, setData] = useState<Person[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sorting, setSorting] = useState<MRT_SortingState>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setData(makeData(10_000))
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex(0)
    } catch (e) {
      console.log(e)
    }
  }, [sorting])

  const table = useMantineReactTable({
    columns,
    data,
    enableRowVirtualization: true,
    enableBottomToolbar: false,
    enableGlobalFilterModes: false,
    enablePagination: false,
    enableRowNumbers: false,
    enableTopToolbar: false,
    enableColumnOrdering: false,

    enableMultiSort: false,
    enableColumnFilters: false,
    enableFilters: false,
    enableBatchRowSelection: false,
    enableRowSelection: false,
    enableColumnResizing: false,
    enableColumnDragging: false,
    enableColumnPinning: false,
    enableClickToCopy: false,
    enableColumnActions: false,
    enableColumnFilterModes: false,
    enableColumnVirtualization: false,
    enableDensityToggle: false,
    enableEditing: false,
    enableExpandAll: false,
    layoutMode: 'grid',
    mantineTableContainerProps: { style: { maxHeight: '700px' } },
    onSortingChange: setSorting,
    state: { isLoading, sorting },
    rowVirtualizerOptions: { overscan: 8 }
  })

  return <MantineReactTable table={table} />
}

export default TableData
