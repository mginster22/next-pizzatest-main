"use client"
import { cn } from "@/shared/lib/utils";

import * as React from "react";
import { Container } from "./container";
import Image from "next/image";

import Link from "next/link";
import SearchInput from "./search-input";
import CartButton from "./CartButton";
import { ProfileButton } from "./profile-button";
import { AuthModal } from "./modals/auth-modal";

interface Props {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
}

const Header: React.FunctionComponent<Props> = ({
  className,
  hasSearch = true,
  hasCart = true,
}) => {

  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  
  return (
    <header className={cn(" border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* {"Левая часть"} */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" width={35} height={35} alt="Logo" />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        <div className="flex items-center gap-3">
          <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)}/>
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)}/>
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};

export default Header;
