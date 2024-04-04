import {
  Button,
  Divider,
  Select,
  Table,
  TableData,
  TextInput
} from '@mantine/core'
import { unparse } from 'papaparse'
import { NavLink } from 'react-router-dom'

const tableData: TableData = {
  caption: 'Some elements from periodic table',
  head: [
    'index',
    'Element position',
    'Atomic mass',
    'Symbol',
    'Element name',
    'Element position',
    'Atomic mass',
    'Symbol',
    'Element name',
    'Element position',
    'Atomic mass',
    'Symbol',
    'Element name'
  ],

  body: Array(1300)
    .fill(0)
    .map((_, index) => {
      return [
        index,
        12.011,
        'C',
        'Carbon',
        'Element position',
        'C',
        'Carbon',
        'C',
        'Carbon',
        12.011,
        'C',
        'Carbon',
        12.011
      ]
    })
}

export default function ShainIdKnri() {
  const exportToCsv = () => {
    const csv = unparse(tableData.body as any, { delimiter: ' , ' })
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'data.csv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  return (
    <div className='bg-white flex-1 flex flex-col p-3'>
      <div className='w-full'>
        <p>社員ID管理</p>
        <div className='grid grid-cols-3 gap-2 w-fit'>
          <Select
            className='w-60 flex gap-2'
            label='部支店'
            placeholder='Pick value'
            data={['React', 'Angular', 'Vue', 'Svelte']}
            classNames={{
              input: 'w-32',
              label: 'flex-1 flex items-center justify-end'
            }}
          />

          <TextInput
            label='課CD'
            className='w-60 flex gap-2'
            classNames={{
              input: 'w-32',
              label: 'flex-1 flex items-center justify-end'
            }}
          />
          <TextInput
            label='社員CD'
            className='w-60 flex gap-2'
            classNames={{
              input: 'w-32',
              label: 'flex-1 flex items-center justify-end'
            }}
          />
          <TextInput
            label='社員名'
            className='w-60 flex gap-2'
            classNames={{
              input: 'w-32',
              label: 'flex-1 flex items-center justify-end'
            }}
          />
          <TextInput
            label='社員名ｶﾅ'
            className='w-60 flex gap-2'
            classNames={{
              input: 'w-32',
              label: 'flex-1 flex items-center justify-end'
            }}
          />
          <TextInput
            label='アカウント'
            className='w-60 flex gap-2'
            classNames={{
              input: 'w-32',
              label: 'flex-1 flex items-center justify-end'
            }}
          />
        </div>
        <Divider className='my-2 border-black' />
        <div className='w-full flex justify-end gap-2'>
          <Button onClick={exportToCsv}>エクスポート</Button>
          <Button onClick={exportToCsv}>新規</Button>
          <Button onClick={exportToCsv}>検索</Button>
        </div>
      </div>
      <div className='flex-1 relative'>
        <div className='absolute inset-0 overflow-scroll'>
          <Table stickyHeader={true} data={tableData} />
          {/* <Table>
                <TableHead>
                  {tableData.head.map((header, index) => (
                    <TableCell
                      key={index}
                      style={{ whiteSpace: 'nowrap', overflowX: 'auto' }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableHead>
                <TableBody>
                  {tableData.body.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <TableCell
                          key={cellIndex}
                          style={{ whiteSpace: 'nowrap', overflowX: 'auto' }}
                        >
                          {cell}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table> */}
        </div>
      </div>
    </div>
  )
}
