import { Button, Divider, Loader, Select, TextInput } from '@mantine/core'
import { unparse } from 'papaparse'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ApiQueryType, useAppQuery } from '../../services/apis/useAppQuery'

type TBushimsQueryParams = ApiQueryType['bushims']['url']['queryParams']
export default function ShainIdKnri() {
  const { data: bscdCbbItem, isLoading: bscdCbbItemLoading } = useAppQuery({
    key: 'bscdCbbItem',
    url: {
      baseUrl: '/bscd-cbb-item'
    }
  })

  const [queryParams, setQueryParams] = useState<TBushimsQueryParams>()

  const { data } = useAppQuery({
    key: 'bushims',
    url: {
      baseUrl: '/bushims',
      queryParams: queryParams!
    },
    options: {
      enabled: !!queryParams
    }
  })

  const queryForm = useForm<TBushimsQueryParams>()

  const exportToCsv = () => {
    if (!data) return
    const csv = unparse(data as any, { delimiter: ' , ' })
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
        <div className='grid grid-cols-3 gap-2 gap-x-6 py-2 w-fit'>
          <Controller
            control={queryForm.control}
            name='bscd'
            render={({ field }) => (
              <Select
                size='sm'
                className='w-40 gap-2'
                label='部支店'
                placeholder='Pick value'
                checkIconPosition='right'
                data={bscdCbbItem?.bscd_cbb.map(item => ({
                  label: item.bsnm,
                  value: item.bscd
                }))}
                value={field.value}
                onChange={value => field.onChange(value)}
                rightSection={bscdCbbItemLoading && <Loader size={12} />}
                classNames={{
                  input: 'min-h-8 h-8',
                  label: ''
                }}
              />
            )}
          />

          <Controller
            control={queryForm.control}
            name='teamcd'
            render={({ field }) => (
              <TextInput
                size='sm'
                label='課CD'
                value={field.value}
                onChange={value => field.onChange(value.target.value)}
                className='w-40 gap-2'
                classNames={{
                  input: 'min-h-8 h-8',
                  label: ''
                }}
              />
            )}
          />

          <Controller
            control={queryForm.control}
            name='shaincd'
            render={({ field }) => (
              <TextInput
                size='sm'
                label='社員名'
                value={field.value}
                onChange={value => field.onChange(value.target.value)}
                className='w-40 gap-2'
                classNames={{
                  input: 'min-h-8 h-8',
                  label: ''
                }}
              />
            )}
          />

          <Controller
            control={queryForm.control}
            name='shainnm1'
            render={({ field }) => (
              <TextInput
                size='sm'
                label='社員名'
                value={field.value}
                onChange={value => field.onChange(value.target.value)}
                className='w-40 gap-2'
                classNames={{
                  input: 'min-h-8 h-8',
                  label: ''
                }}
              />
            )}
          />

          <Controller
            control={queryForm.control}
            name='shainnm2'
            render={({ field }) => (
              <TextInput
                size='sm'
                label='社員名ｶﾅ'
                value={field.value}
                onChange={value => field.onChange(value.target.value)}
                className='w-40 gap-2'
                classNames={{
                  input: 'min-h-8 h-8',
                  label: ''
                }}
              />
            )}
          />

          <Controller
            control={queryForm.control}
            name='acct'
            render={({ field }) => (
              <TextInput
                size='sm'
                label='アカウント'
                value={field.value}
                onChange={value => field.onChange(value.target.value)}
                className='w-40 gap-2'
                classNames={{
                  input: 'min-h-8 h-8',
                  label: ''
                }}
              />
            )}
          />
        </div>

        <div className='w-full flex justify-end gap-2'>
          <Button
            size='sm'
            className='h-8 bg-slate-200 text-black'
            onClick={exportToCsv}
          >
            エクスポート
          </Button>
          <Button
            size='sm'
            className='h-8 bg-slate-200 text-black'
            onClick={exportToCsv}
          >
            新規
          </Button>
          <Button
            size='sm'
            className='h-8 bg-slate-200 text-black'
            onClick={queryForm.handleSubmit(data => {
              setQueryParams(data)
            })}
          >
            検索
          </Button>
        </div>
      </div>

      <Divider className='my-2 border-black' />

      <div className='flex-1 relative'>
        <div className='absolute inset-0 overflow-scroll'>
          <table className='table-auto border-collapse border border-slate-500'>
            <thead className='sticky top-[-1px]'>
              <tr>
                <th className='w-6'></th>
                <th>部支店CD</th>
                <th>部支店名</th>
                <th className='w-6'>課</th>
                <th>社員CD</th>
                <th>社員名</th>
                <th>社員名ｶﾅ</th>
                <th>役職CD</th>
                <th>役職名</th>
                <th className='w-6'>性別</th>
                <th>ﾒｰﾙｱﾄﾞﾚｽ</th>
                <th>ｱｶｳﾝﾄ</th>
                <th>ﾊﾟｽﾜｰﾄﾞ</th>
                <th className='w-6'>ﾀｲﾌﾟ者ｲﾆｼｬﾙ</th>
                <th>登録日</th>
                <th>更新日</th>
              </tr>
            </thead>
            <tbody>
              {data?.map(item => (
                <tr key={item.shaincd}>
                  <td className='text-blue-700'>編集</td>
                  <td className='text-center'>{item.bscd}</td>
                  <td>{item.bsnm}</td>
                  <td className='text-center'>{item.blkcd}</td>
                  <td className='text-center'>{item.shaincd}</td>
                  <td>{item.shainnM1}</td>
                  <td>{item.shainnM2}</td>
                  <td className='text-center'>{item.yakucd}</td>
                  <td>{item.yakunm}</td>
                  <td className='text-center'>{item.seibetsu}</td>
                  <td>{item.mail}</td>
                  <td>{item.acct}</td>
                  <td>{item.pwd}</td>
                  <td className='text-center'>{item.typecd}</td>
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
