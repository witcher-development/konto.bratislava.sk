import {ArrowRightIcon, ChevronRightIcon} from '@assets/ui-icons'
import AccountMarkdown from 'components/forms/segments/AccountMarkdown/AccountMarkdown'
import Button from 'components/forms/simple-components/Button'
import Image from 'next/legacy/image'
import { useTranslation } from 'next-i18next'
import ProgressBar from "../../../simple-components/ProgressBar";
import UploadFileCard from "../../../widget-components/Upload/UploadFileCard";
import IconButton from "@rjsf/core/lib/components/templates/ButtonTemplates/IconButton";
import ButtonNew from "../../../simple-components/ButtonNew";
import {useEffect, useState} from "react";
import {goals, Goal} from "../../../../../pages/city-hero";
import Link from "next/link";

type ActualBlockBase = {
  announcementContent?: string
  imagePath?: string
  buttonTitle?: string
  onPress?: () => void
}

//     <Button
//                 className="hidden lg:flex"
//                 endIcon={<ArrowRightIcon className="h-6 w-6" />}
//                 variant="category"
//                 text={buttonTitle}
//                 onPress={onPress}
//               />

// <div className="rounded-rt-none relative flex h-[180px] w-full items-center justify-center rounded-t-lg lg:h-auto lg:w-1/2 lg:rounded-r-3xl lg:rounded-tl-none">
//           <Image
//             src={imagePath}
//             className="rounded-rt-none rounded-t-lg lg:rounded-r-3xl lg:rounded-tl-none"
//             layout="fill"
//             priority
//             objectFit="cover"
//             objectPosition="center"
//           />
//         </div>

// <div className="flex flex-col gap-2">
//             <AccountMarkdown content={announcementContent} />
//           </div>
//

//  lg:p-12 lg:pr-14

const AnnouncementBlock = ({
  announcementContent,
  imagePath = '',
  buttonTitle,
  onPress,
}: ActualBlockBase) => {
    // const [goals, setGoals] = useState<Goal[]>([])
    //
    // useEffect(() => {
    //     const fetch = async () => {
    //         const response = await client.get('/goal')
    //
    //         setGoals(response.data)
    //     }
    //     fetch()
    // }, [])

  const { t } = useTranslation('account')
  return announcementContent ? (
    <div className="mb-6 px-4 lg:mb-16 lg:px-0 w-full">
      <h2 className="text-h2 mb-4 lg:mb-6">{t('account_section_intro.announcement_title')}</h2>
      <div className="flex w-full flex-col-reverse gap-8 rounded-lg lg:flex-row lg:rounded-3xl">
        <div className="flex w-full flex-col justify-center gap-4 lg:gap-6">

            {goals.map(({ id, name, cityProgress, communityProgress, communityProgressLabel, cityProgressLabel }) => (
                <Link href={`/city-hero?id=${id}`}>
                <div className="flex flex-col gap-5 w-full border-2 border-gray p-4 rounded-xl">
                    <h3 className="text-h3">
                        {name}
                    </h3>
                    <div className="flex">
                        <div className="flex flex-col items-center gap-2" style={{ width: '50%' }}>
                            <ProgressBar value={cityProgress} type="city" label="100kg" />
                            <p className="mr-2">
                                {cityProgressLabel}
                            </p>
                        </div>
                        <div className="bg-gray-200 h-6 w-0.5"></div>
                        <div className="flex flex-col items-center gap-2" style={{ width: '50%' }}>
                            <ProgressBar value={communityProgress} type="success" label="500 points" mirrored={true} />
                            <p className="ml-2">
                                {communityProgressLabel}
                            </p>
                        </div>
                    </div>
                </div>
                </Link>
            ))}

        </div>
      </div>
      <div className="border-b-2 border-gray-200 pt-6 lg:pt-16" />
    </div>
  ) : null
}

export default AnnouncementBlock
