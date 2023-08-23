import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { RegisterForm } from '../components/RegisterForm'

export default function Register() {
  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">CampUs: A smarter way to find group partners</h2>
            <div className="flex items-center space-x-2 px-8">
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Register to access CampUs
              </h1>
              <p className="text-sm text-muted-foreground">
                Use one of the sign-in methods below
              </p>
            </div>
            <RegisterForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              If you already own an account please {" "}
              <Link
                href="/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                login
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}