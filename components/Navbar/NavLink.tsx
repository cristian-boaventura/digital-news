import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({
  href,
  linkName,
  icon,
}: {
  href: string;
  linkName: string;
  icon: JSX.Element;
}) => {
  const currentRoute = usePathname();
  const isActive = currentRoute === href;

  return (
    <li>
      <Link
        href={href}
        prefetch={false}
        className={`py-3 text-base capitalize text-current ${
          isActive ? "active" : ""
        }`}
      >
        {icon}
        {linkName}
      </Link>
    </li>
  );
};

export default NavLink;
