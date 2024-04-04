import { Button, Table, TableData } from '@mantine/core'
import { unparse } from 'papaparse'

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

export default function TableData() {
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
    <div className='absolute inset-0 overflow-y-auto'>
      <Button onClick={exportToCsv}>Export csv</Button>
      <div className='h-[80vh] w-[80vw] snap-center overflow-scroll bg-gray-500'>
        <Table stickyHeader={true} data={tableData} />
      </div>
    </div>
  )
}
