/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionIcon, Button, TextInput } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconMinus, IconPlus } from '@tabler/icons-react'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { msgError } from '../../services/msg'

type FormValues = {
  listPSA: { shainCd: string; adminComment: string }[]
}

export default function KnrishaIdKnri() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setFocus,
    formState: { errors, submitCount }
  } = useForm<FormValues>({
    defaultValues: { listPSA: [{ shainCd: '', adminComment: '' }] }
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'listPSA'
  })
  const watchFieldArray = watch('listPSA')
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index]
    }
  })

  useEffect(() => {
    const listError = (errors?.listPSA as unknown[])?.filter(
      (i: unknown) => !!i
    )

    if (listError?.[0]) {
      const msg = (Object.values(listError?.[0])?.[0] as any)?.message || ''
      notifications.clean()
      notifications.show({
        color: 'red',
        title: 'Error',
        message: msg
      })
      errors?.listPSA?.[0]?.ref?.focus && errors?.listPSA?.[0]?.ref?.focus()
      return
    }
  }, [errors, setFocus, submitCount])

  return (
    <div className='h-screen flex-1 flex flex-col p-4 overflow-auto'>
      <p className='text-2xl font-bold mb-10'>管理者ID</p>
      <form
        className='flex flex-col h-full w-max'
        onSubmit={handleSubmit(data => console.log(data))}
      >
        <div className='flex-1'>
          <div className='flex items-center gap-4 mb-4'>
            <div className='flex-none w-[200px]'></div>
            <div className='flex-none w-[300px]'>ID</div>
            <div className='flex-1'>備考</div>
          </div>
          {controlledFields.map((field, index) => {
            return (
              <div key={index} className='flex items-center gap-4 mb-4'>
                <div className='flex-none w-[200px]'>{index + 1}. 社員ID</div>
                <div className='flex-none w-[300px]'>
                  <TextInput
                    maxLength={4}
                    className='w-[300px]'
                    {...register(`listPSA.${index}.shainCd` as const, {
                      required: `社員ID${msgError.required}`,
                      pattern: {
                        value: /[0-9]+/,
                        message: `社員ID${msgError.invalid}`
                      }
                    })}
                  />
                </div>
                <div className='flex-1 flex items-center gap-2'>
                  <TextInput
                    maxLength={20}
                    className='w-[500px]'
                    {...register(`listPSA.${index}.adminComment` as const)}
                  />

                  <ActionIcon
                    onClick={() => remove(index)}
                    className='rounded-full'
                    color='red'
                    disabled={controlledFields.length === 1}
                  >
                    <IconMinus />
                  </ActionIcon>
                </div>
              </div>
            )
          })}

          <ActionIcon
            onClick={() => append({ shainCd: '', adminComment: '' })}
            className='rounded-full'
            disabled={controlledFields.length === 10}
          >
            <IconPlus />
          </ActionIcon>
        </div>
        <Button type='submit' className='flex-none ml-auto text-xs mt-4'>
          更新
        </Button>
      </form>
    </div>
  )
}
