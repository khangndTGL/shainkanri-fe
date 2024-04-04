import { Button, PasswordInput, TextInput } from '@mantine/core'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { lsActions } from '../../services/common'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { notifications } from '@mantine/notifications'
import { msgError } from '../../services/msg'

type Inputs = {
  id: string
  password: string
}

export default function Auth() {
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data)
    lsActions.setToken('dingdong')
    navigate('/shainIdKnri')
  }

  const {
    setFocus,
    control,
    handleSubmit,
    formState: { errors, submitCount }
  } = useForm<Inputs>({
    defaultValues: {},
    mode: 'onSubmit'
  })

  useEffect(() => {
    notifications.clean()
    if (errors.id?.message) {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: errors?.id?.message
      })
      setFocus('id')
      return
    }
    if (errors?.password?.message) {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: errors?.password?.message
      })
      setFocus('password')
      return
    }
  }, [errors, setFocus, submitCount])

  return (
    <section className='w-screen h-screen flex justify-center items-center bg-[#f0f0f0]'>
      <form className='w-[400px] p-4' onSubmit={handleSubmit(onSubmit)}>
        <div className='p-4 flex flex-col gap-5'>
          <p className='font-bold text-3xl mb-4 text-center'>
            管理者のログイン画面
          </p>

          <Controller
            name='id'
            control={control}
            rules={{
              required: `管理ID${msgError.required}`
            }}
            render={({ field }) => (
              <TextInput
                ref={field.ref}
                classNames={{
                  label: 'text-sm font-semibold',
                  input: 'bg-[#fafafa] rounded-lg'
                }}
                size='md'
                label='管理ID'
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name='password'
            control={control}
            rules={{
              required: `パスワード${msgError.required}`
            }}
            render={({ field }) => (
              <PasswordInput
                ref={field.ref}
                classNames={{
                  label: 'text-sm font-semibold',
                  input: 'bg-[#fafafa] rounded-lg'
                }}
                size='md'
                label='パスワード'
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Button type='submit' className='rounded-2xl text-xs mt-4' size='lg'>
            ログインする
          </Button>
        </div>
      </form>
    </section>
  )
}
