import { ReactNode } from "react"

type Props = {
    children: ReactNode,
}
const layout = ({children}: Props) => {
  return (
    <div>
        <aside className="bg-gray-500 p-5">
            admin sidebar
        </aside>
        {children}
    </div>
  )
}
export default layout