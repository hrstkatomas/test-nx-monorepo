import type { ReactNode } from "react";

interface ButtonProps {
	children: ReactNode;
	className?: string;
	appName: string;
}

export const Button = ({ children, className, appName }: ButtonProps) => {
	return (
		<button
			type="button"
			className={className}
			onClick={() => console.log(`Hello from your ${appName} app!`)}
		>
			SUP there
			{children}
		</button>
	);
};
