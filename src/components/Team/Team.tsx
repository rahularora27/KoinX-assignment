'use client';
import teamMembers from './TeamMembers';

import Image from 'next/image';

export default function Team() {
  return (
    <div className="rounded-lg bg-white p-6">
      <h2 className="mb-6 text-2xl font-semibold">Team</h2>

      <p className="mb-6 leading-7 text-[#3E424A]">
        Lorem ipsum dolor sit amet consectetur. Id consequat adipiscing arcu
        nibh. Eget mattis in mi integer sit egestas. Proin tempor id pretium
        quam. Facilisis purus convallis quam augue.
      </p>

      {/* Team Members */}
      <div className="space-y-4">
        {teamMembers.map((member, index) => (
          <div key={index} className="rounded-lg bg-[#E8F4FD] p-6">
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex flex-col items-center justify-between">
                <div className="relative mb-2 h-24 w-24">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <h3 className="max-w-[100px] truncate text-sm font-semibold text-[#0F1629]">
                  {member.name}
                </h3>
                <span className="max-w-[100px] truncate text-xs text-[#788F9B]">
                  {member.designation}
                </span>
              </div>

              <p className="leading-7 text-[#0F1629]">{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
