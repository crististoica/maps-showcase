import Link from 'next/link';
import { useRouter } from 'next/router';

type TStyledLinkProps = {
  href: string;
  label: string;
};

const StyledLink = (props: TStyledLinkProps) => {
  const { href, label } = props;
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <Link href={href} passHref legacyBehavior>
      <a
        className={`px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ${
          isActive ? 'border-b-[3px]' : ''
        }`}
      >
        <span className="ml-2">{label}</span>
      </a>
    </Link>
  );
};

export default StyledLink;
