import {
  Button,
  Divider,
  Loader,
  Select,
  Table,
  TableData,
  TextInput
} from '@mantine/core'
import { unparse } from 'papaparse'
import { useMemo, useState } from 'react'
import { ApiQueryType, useAppQuery } from '../../services/apis/useAppQuery'
import { useForm } from 'react-hook-form'

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

type TBushimsQueryParams = ApiQueryType['bushims']['url']['queryParams']
export default function ShainIdKnri() {
  const { data: bscdCbbItem, isLoading: bscdCbbItemLoading } = useAppQuery({
    key: 'bscdCbbItem',
    url: {
      baseUrl: '/bscd-cbb-item'
    }
  })

  const { data } = useAppQuery({
    key: 'bushims',
    url: {
      baseUrl: '/bushims',
      queryParams: {
        acct: '',
        bscd: '',
        shaincd: '',
        shainnm1: '',
        shainnm2: '',
        teamcd: ''
      }
    }
  })

  const queryForm = useForm<TBushimsQueryParams>()

  const [queryParams, setQueryParams] = useState<TBushimsQueryParams>({
    bscd: '',
    teamcd: '',
    shaincd: '',
    shainnm1: '',
    shainnm2: '',
    acct: ''
  })

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

  // const table = useMemo(
  //   () => <Table stickyHeader={true} data={tableData} />,
  //   [tableData]
  // )
  return (
    <div className='bg-white flex-1 flex flex-col p-3'>
      <div className='w-full'>
        <p>社員ID管理</p>
        <div className='grid grid-cols-3 gap-2 w-fit'>
          <Select
            className='w-60 flex gap-2'
            label='部支店'
            placeholder='Pick value'
            checkIconPosition='right'
            data={bscdCbbItem?.bscd_cbb.map(item => ({
              label: item.bsnm,
              value: item.bscd
            }))}
            value={queryParams.bscd}
            onChange={value => setQueryParams({ ...queryParams, bscd: value! })}
            rightSection={bscdCbbItemLoading && <Loader size={12} />}
            classNames={{
              input: 'w-32',
              label: 'flex-1 flex items-center justify-end'
            }}
          />

          <TextInput
            label='課CD'
            value={queryParams.teamcd}
            onChange={value =>
              setQueryParams({ ...queryParams, teamcd: value.target.value })
            }
            className='w-60 flex gap-2'
            classNames={{
              input: 'w-32',
              label: 'flex-1 flex items-center justify-end'
            }}
          />
          <TextInput
            label='社員CD'
            value={queryParams.shaincd}
            onChange={value =>
              setQueryParams({ ...queryParams, shaincd: value.target.value })
            }
            className='w-60 flex gap-2'
            classNames={{
              input: 'w-32',
              label: 'flex-1 flex items-center justify-end'
            }}
          />
          <TextInput
            label='社員名'
            value={queryParams.shainnm1}
            onChange={value =>
              setQueryParams({ ...queryParams, shainnm1: value.target.value })
            }
            className='w-60 flex gap-2'
            classNames={{
              input: 'w-32',
              label: 'flex-1 flex items-center justify-end'
            }}
          />
          <TextInput
            label='社員名ｶﾅ'
            value={queryParams.shainnm2}
            onChange={value =>
              setQueryParams({ ...queryParams, shainnm2: value.target.value })
            }
            className='w-60 flex gap-2'
            classNames={{
              input: 'w-32',
              label: 'flex-1 flex items-center justify-end'
            }}
          />
          <TextInput
            label='アカウント'
            value={queryParams.acct}
            onChange={value =>
              setQueryParams({ ...queryParams, acct: value.target.value })
            }
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
          <table className='table-auto border-collapse border border-slate-500'>
            <thead>
              <tr>
                {[
                  '部支店CD',
                  '部支店名',
                  '課',
                  '社員CD',
                  '社員名',
                  '社員名ｶﾅ',
                  '役職CD',
                  '役職名',
                  '性別',
                  'ﾒｰﾙｱﾄﾞﾚｽ',
                  'ｱｶｳﾝﾄ',
                  'ﾊﾟｽﾜｰﾄﾞ',
                  'ﾀｲﾌﾟ者ｲﾆｼｬﾙ',
                  '登録日',
                  '更新日'
                ].map((item, index) => (
                  <th key={index} className='border border-slate-500'>
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map(item => (
                <tr key={item.shaincd}>
                  <td>{'button'}</td>
                  <td>{item.bscd}</td>
                  <td>{item.bsnm}</td>
                  <td>{item.blkcd}</td>
                  <td>{item.shaincd}</td>
                  <td>{item.shainnM1}</td>
                  <td>{item.shainnM2}</td>
                  <td>{item.yakucd}</td>
                  <td>{item.yakunm}</td>
                  <td>{item.seibetsu}</td>
                  <td>{item.mail}</td>
                  <td>{item.acct}</td>
                  <td>{item.pwd}</td>
                  <td>{item.typecd}</td>
                  <td>{item.inpdt}</td>
                  <td>{item.updt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
