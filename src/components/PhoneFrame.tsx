import React, { useState } from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

/**
 * Bingkai HP untuk pratinjau di layar lebar (>= 768px). Di layar sempit
 * komponen ini hanya meneruskan anaknya, jadi di HP asli aplikasi tetap
 * tampil layar penuh. Tambahkan `?frame=0` pada URL untuk mematikannya.
 */
const isFrameEnabled = () => {
  if (typeof window === 'undefined') return true;
  return new URLSearchParams(window.location.search).get('frame') !== '0';
};

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  // Dibaca sekali saat mount: query string tidak berubah tanpa reload.
  const [isFramed] = useState(isFrameEnabled);

  return (
    <div className={`phone-shell${isFramed ? ' pf-framed' : ''}`}>
      <div className="phone-frame">
        <div className="phone-notch" aria-hidden="true" />
        <div className="phone-screen" data-app-scroll="">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * Menggulirkan area scroll aplikasi ke atas.
 *
 * Di dalam bingkai, yang menggulir adalah elemen layar, bukan jendela
 * browser; tanpa bingkai justru sebaliknya. Keduanya dipanggil karena
 * perintah pada elemen yang tidak menggulir tidak berefek apa pun.
 */
export const scrollAppToTop = (behavior: ScrollBehavior = 'smooth') => {
  document
    .querySelector<HTMLElement>('[data-app-scroll]')
    ?.scrollTo({ top: 0, behavior });
  window.scrollTo({ top: 0, behavior });
};
