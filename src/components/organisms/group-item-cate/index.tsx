import React from 'react';
import './index.scss';
import { ItemCategory } from '../../molecules/item-category';
import { Text } from '../../atoms/text';
import { Button } from '../../atoms/button';
export interface GroupItemCateProps {}

export const GroupItemCate: React.FC<GroupItemCateProps> = props => {
  const listCate = [
    {
      id: 1,
      companyName: 'Slack',
      type: 'Full time',
      title: 'Software enginner',
      description: 'Web design hack accelerator branding value.',
      salary: '$6500',
      imgUrl:
        'https://s3-alpha-sig.figma.com/img/bf66/72d0/bf86bb23ecc603da87a9b3ea8d634ac2?Expires=1684108800&Signature=iFXmD3xptAj7JhiOffG~cGEHYGlmN2UMa0hUguN-l1DQln3jk2xePyBarP8M4-sUygnmHMZE82ZBrUYRX0qrBurKBlpsmodmdZNglJcihgB3mj7ADDh-tXcz6lKn0CUXOyMnIfdPJbV4p0vZnBHUae-H2FHKoe4gxZZzNpYRVIYgv6bsw9137Kc-kc6mZnNmV-gG5qaQwqazWk7D8MUnTpszTLbr~IkRUC-Y18Uo85U~Ehin7RDDCoIDJA90pDVEmNj0LCyWm4o48tb0Zuq-kXsXtUOo5B6MU74e6etHN5mN3HgtYLs54v2QC3eWPIxPA3CrFgd36cp4~L4I8BLJNg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    },
    {
      id: 2,
      companyName: 'Patch',
      type: 'Full time',
      title: 'Data  varification',
      description: 'Web design hack accelerator branding value.',
      salary: '$7000',
      imgUrl:
        'https://s3-alpha-sig.figma.com/img/64de/3f97/f01a99e8c7f213d5ddd445b26105ffd2?Expires=1684108800&Signature=UC9uBg5J77Rk5fSoQcTa5LK1ejeygjKy8xGRkLoyG~f5Vupg1xYCtCFgobFVIWgX-z7oOxPpepKD7uooVkKXqDx2WQn0qL-PP4TNx8k0I4bk75FkMuD2fWpBK2tL8Vddlo2c9aPrMZ2a8jna5vHK4Pgf3uNqNBO0yMK1t2S08VxuAA9G8YYCpsK58c~A2skVMd7cdGrexRhyZoG-gaSzXmnxIsDYf4TjLn4DkvBvt95JNfFGXUVOUYvg9mC46Xw7v7jRTzfmm~ZCxaMiJIv7tIW48YgfzYG2PvOXscJE0IE9j4wAnSaYaTf70CwkSxa0zew1WCg76wLpRPepNJbBKA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    },
    {
      id: 3,
      companyName: 'Tik Tok',
      type: 'Full time',
      title: 'Backend developer',
      description: 'Web design hack accelerator branding value.',
      salary: '$6200',
      imgUrl:
        'https://s3-alpha-sig.figma.com/img/65ce/5dc5/463c93f8bc301c02d11bff8b12fb349d?Expires=1684108800&Signature=JlUL7jW4XEredSfFLVwvCO75yos5LXopjYqi8ZVhoLEuoHDqz2NDedUQvZyNANtR~JxCL-ycSOf0o~yg8ERbjLS2HqbZMGc6oFKIo7EzZRIXp3zQlKmvuaVaelA0waxWkWXG0C7oowJKZOLbukmP6UgWc6Rp-KzTmLeldEQ14sUyS6upXr7xOgucXPTBBgtBfXACPwZT-wbh5tsaK2Qi8iVCktKK4jZUxEl9Nb2BttsPOITAqoIfjf8H2iWLYpnArFvjgK0Ord00n20Mch5uMRJRukH5XU~wlDZlOTT-6-LLDZM-v0qZ9Uvr5QZhbfwlLerjldJynDuiPN8rvijwEQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    },
    {
      id: 4,
      companyName: 'Discord',
      type: 'Full time',
      title: 'UI designer',
      description: 'Web design hack accelerator branding value.',
      salary: '$6800',
      imgUrl:
        'https://s3-alpha-sig.figma.com/img/b5c4/b4da/22d16d8c512eca70d1d2828c2fd52021?Expires=1684108800&Signature=KyhMkXaKknv6iAZVOdIzoAV94PXAReyd3ZjFnm0lIZqu9xnGVRjgNH6YVeVwQIis7REfAvcLY~4Rxc4-OefuAJU1M638Yti3tVjkcph4SDvvHsp-YjeB5MrK~3EAcEAU9VV-fGb-VQujLk9quAizedtQyhgqQviHQtlNdPxN5G6Pv0MBXGa6k~LkCE71dld9t6guiLVmzzPw5zEanYHsw6QJYOLYZuhLDEZrZsyigdP9ROir3bQwDqSZnAPmr3SeHbszufEI~3g9~AxnRA3KHRNgiTaZn36IvuSMseKidKVCR5unCAev5v4j8g4gM3i7-sfNVGDxJVbEL8XlODE-Zg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    },
    {
      id: 5,
      companyName: 'Airbnb',
      type: 'Full time',
      title: 'Fullstack Developer',
      description: 'Web design hack accelerator branding value.',
      salary: '$5500',
      imgUrl:
        'https://s3-alpha-sig.figma.com/img/55b0/f2cf/ad1abcf7bb02248e0dbdc0ef75d11357?Expires=1684108800&Signature=ImuOhbrZPOA3L-YsVjJtmLfdvJJbrCcFXs8ZzfvY7C5cmX1Ee265-NwONBrOtIpCfFaWKHHaERVn~~UnMWsBmxMpLf-95j3JKOMLoJwTYUyYjMlIhUdXowTYFcqrpHNOnWZSjbkf-bhGNGQa1sxbuYPomui-5f7pUfXaV76v0nVMahQYxGJGXmZhONpdD3i0vZS0bfAVuofdbN4Bx4DyCugwgsoymh9dtgP0uRRxwyVJi34Fr8fgQSuuYNmKYpmsy06xHE0efSWfmATep3qz4F-u8GsHkZ5yIvZttNbM3uj7qYdK3DiRMtMT~70GjzwPO~T17o~HPDI0jeVnwuKRtQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    },
    {
      id: 6,
      companyName: 'Apple',
      type: 'Full time',
      title: 'App Developement',
      description: 'Web design hack accelerator branding value.',
      salary: '$7500',
      imgUrl:
        'https://s3-alpha-sig.figma.com/img/a669/bb81/8abf638d4b14347baf79d8c45d671cfe?Expires=1684108800&Signature=BWkWKftsYoVmuE3d-liGNq~HI03dLu5DHZuprkck0cGGOr1KHCdvS4h62BebOkCDPJ3s7psgq6k-U8tLDiEMygCFKv4cst7miv~c9rbp0dIzECfLjCQoGM6SxjyIBoGIUYM9knspjD8vHd~KhNudl4ob1CYN86TUyT6chQqZ8O2QoYo6g3teSRF~h8PSdWHQTLWpSQR29~VftOzMHJvhb1rmTgpnwvTi3NNH0FOVbM-pROinB9QLn0hgSRlH~7-Kbrx7egqYS9-2nLr7pGQyWjJIupxLZw694bGRD-Gp3AG4jKKVc9XsUclXC0Nrm7OWgc8RAuaekKfFFIKVhHP98g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    },
  ];
  return (
    <div className="group__cate">
      <div className="group__cate__title">
        <Text
          content="Explore The Most In-Demand "
          color="#113142"
          fontSize="48px"
          fontWeight="600"
          textAlign="center"
          margin="0"
        />
        <Text
          content="Categories "
          color="#1657ff"
          fontSize="48px"
          fontWeight="600"
          textAlign="center"
          margin="0"
        />
      </div>
      <div className="group__cate__item">
        <div className="group__cate__item__sub">
          {' '}
          {listCate.map(cate => (
            <ItemCategory
              companyName={cate.companyName}
              type={cate.type}
              title={cate.title}
              description={cate.description}
              salary={cate.salary}
              imgUrl={cate.imgUrl}
            />
          ))}
        </div>
      </div>
      <div className="group__cate__btn">
        <Button title="View all job" />
      </div>
    </div>
  );
};
