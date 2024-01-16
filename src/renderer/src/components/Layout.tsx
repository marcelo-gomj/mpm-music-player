import { ReactNode, useContext } from "react";
import Header from "./Header";
import PlayerController from "./PlayerComponents/PlayerController";
import { RouterContext } from "../contexts/Router";

type LayoutProps = {
	children: ReactNode
}

function Layout({ children }: LayoutProps) {
	const { currentPath } = useContext(RouterContext);

	const isPlayerRoute = currentPath === 'player';
	return (
		<div className="relative bg-base-300 h-[100vh] w-full text-[white]">
			<div className="flex relative h-full">
				<Header />

				<div className={`grid relative ${isPlayerRoute ? 'grid-rows-[calc(100%_-_5rem)_5rem]' : 'grid-rows-[calc(100%_-_2.75rem)_2.75rem]'} w-full h-full`}>
					<div className="">{children}</div>

					<div className="flex justify-end pt-2 w-full h-full">
						<PlayerController durationTotal={0} />
					</div>
				</div>
			</div>

		</div>
	)
}

export default Layout;
