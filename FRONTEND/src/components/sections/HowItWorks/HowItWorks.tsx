import React from 'react'
import { LucideIcon, SearchCheck, Upload, Users} from 'lucide-react'

interface HowItWorksSteps {
    id: number;
    title: string;
    description: string;
    icon: LucideIcon
}

const steps: HowItWorksSteps[] = [
    {
        id: 1,
        title: "Report a Missing Person",
        description: "Families can upload photos and important details of a missing person to create a centralized report.",
        icon: Upload,

    },
    {
        id: 2,
        title: "Community Spots & Reports",
        description: "Anyone who sees a matching person can submit a sighting with location and details.",
        icon: Users,
    },
    {
        id: 3,
        title: "Match & Reconnect",
        description: "Our system helps identify possible matches so families can reconnect faster.",
        icon: SearchCheck,
    }
]
const HowItWorks: React.FC = () => {
  return (
    <section className='bg-black px-6 py-24 text-white'>
        <div className='mx-auto max-w-7xl'>
            {/*Heading */}
            <div className='mb-16 text-center'>
                <h2 className='text-3xl font-bold sm:text-4xl'>
                    How It works
                </h2>
                <p className=' mt-4 text-gray-400'>
                    A simple, transparent process designed to help people 
                    find their loved ones faster.
                </p>
            </div>
            {/* Steps */}
            <div className='grid gap-10 md:grid-cols-3'>
                {steps.map((step) => {
                    const Icon = step.icon;
                    return (
                        <div
                            key={step.id}
                            className='group rounded-2xl border-white/10 bg-white/5 p-8 backdrop-blur-2xl transition hover:border-indigo-500/40 hover:bg-white/10' 
                        >
                            {/* Icon */}
                            <div className='mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600/30 text-indigo-400'>
                                <Icon size={28}/>
                            </div>
                            {/* Content */}
                            <h3 className='mb-3 text-xl font-semibold'>
                                {step.title}
                            </h3>
                            <p className='text-gray-400'>
                                {step.description}
                            </p>
                            {/* Step number */}
                            <div className='mt-6 text-sm font-medium text-indigo-400'>
                                Step {step.id}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
    
  )
}

export default HowItWorks
