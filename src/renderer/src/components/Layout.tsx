import { ReactNode } from "react";
import Header from "./Header";

type LayoutProps = {
	children: ReactNode
}

function Layout({ children } : LayoutProps) {
	return (
		<div className="flex relative h-[100vh] bg-base-300 text-[white]">
			<Header />
			<div className="w-full">
				{ children }
			</div>
		</div>
	)
}

export default Layout;
