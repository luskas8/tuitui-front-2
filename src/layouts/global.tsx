import { ReactNode } from 'react'
import Navigation from '../components/navigation';

interface LayoutProps {
  children: ReactNode;
  classname?: string;
  overgflow?: boolean;
}

// TODO: Add navigation

export default function Layout ({ children, classname, overgflow = true }: LayoutProps) {
  return (
    <div className='w-full min-h-screen bg-slate-300 flex flex-col'>
      <Navigation />
      <div data-name='app-content' className={String('w-full h-full px-5 py-7 ').concat(overgflow ? "overflow-hidden" : "").concat(classname ?? '')}>
        {children}
      </div>
    </div>
  )
}

export function LoadingLayout ({ children, classname }: LayoutProps) {
  return (
    <div className='w-full min-h-screen bg-slate-300 flex flex-col'>
      <div data-name='app-content' className={String('w-full h-full px-5 py-7 overflow-hidden ').concat(classname ?? '')}>
        {children}
      </div>
    </div>
  )
}
