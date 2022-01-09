{
  /**
   * Record: 타입 하나를 key로 사용, 타입 다른 하나를 value로 사용해 새로운 타입을 구성
   */
  type PageInfo = {
    title: string;
  };

  type Page = 'home' | 'about' | 'contact';

  const nav: Record<Page, PageInfo> = {
    home: { title: 'Home' },
    about: { title: 'About' },
    contact: { title: 'Contact' }
  };
}
