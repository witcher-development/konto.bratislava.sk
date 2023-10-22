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
    <div className="mb-6 px-4 lg:mb-16 lg:px-0">
      <h2 className="text-h2 mb-4 lg:mb-6">{t('account_section_intro.announcement_title')}</h2>
      <div className="flex w-full flex-col-reverse gap-8 rounded-lg border-2 border-gray-200 lg:flex-row lg:rounded-3xl">
        <div className="flex w-full flex-col justify-center gap-4 p-8 lg:w-1/2 lg:gap-6">

            {goals.map(({ name, progress }) => (
                <div className="flex border-2 border-gray p-8 rounded-3xl">
                    <div className="flex">
                        <ProgressBar value={progress} type="success" />
                        <div className="transform rotate-180">
                            <ProgressBar value={progress} type="success" />
                        </div>
                    </div>
                    <ButtonNew
                        variant="black-link"
                        href="/city-hero"
                    ><ChevronRightIcon /></ButtonNew>
                </div>
            ))}

        </div>
      </div>
      <div className="border-b-2 border-gray-200 pt-6 lg:pt-16" />
    </div>
  ) : null
}

export default AnnouncementBlock
