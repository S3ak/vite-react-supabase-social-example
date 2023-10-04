import { Link } from "@tanstack/react-router";
import { NAVIGATION } from "../../lib/constants";

export default function Navigation() {
  return (
    <nav>
      {NAVIGATION.map((item) => (
        <Link key={item.href} to={item.href}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
