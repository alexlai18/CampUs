import Login from "./login/page";

export const metadata = {
  title: 'CampUs',
}

export default function Home() {
  // We will put in some token logic here to determine the return value
  return (
    <>
      <Login />
    </>
  )
}
