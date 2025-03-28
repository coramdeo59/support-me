import { LightDarkToggle } from "../../components/ui/light-dark-toggle";

type Props = {
    children?: React.ReactNode;
};

export default function auth({ children }: Props) {
    return (
        <>
        <div className="flex flex-col gap-4 min-h-screen p-24 items-center justify-center">{children}</div>
        <LightDarkToggle className="fixed top-[calc(50%-12px)] right-2 -mt-3" />
        </>
    );
}