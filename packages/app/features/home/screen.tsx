import {
  Adapt,
  Anchor,
  Button,
  Dialog,
  Fieldset,
  H1,
  Input,
  Label,
  Paragraph,
  Separator,
  Sheet,
  SwitchRouterButton,
  SwitchThemeButton,
  TooltipSimple,
  Unspaced,
  useToastController,
  XStack,
  YStack,
} from '@my/ui'
import { ChevronDown, ChevronUp, X } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Platform } from 'react-native'
import { useLink } from 'solito/navigation'

export function HomeScreen({ pagesMode = false }: { pagesMode?: boolean }) {
  const linkTarget = pagesMode ? '/pages-example-user' : '/user'
  const linkProps = useLink({
    href: `${linkTarget}/nate`,
  })

  return (
    <YStack flex={1} justify="center" items="center" gap="$8" p="$4" bg="$background">
      <XStack
        position="absolute"
        width="100%"
        t="$6"
        gap="$6"
        justify="center"
        flexWrap="wrap"
        $sm={{ position: 'relative', t: 0 }}
      >
        {Platform.OS === 'web' && (
          <>
            <SwitchRouterButton pagesMode={pagesMode} />
            <SwitchThemeButton />
          </>
        )}
      </XStack>

      <YStack gap="$4">
        <H1 text="center" color="$color12">
          Welcome to Tamagui.
        </H1>
        <Paragraph color="$color10" text="center">
          Here's a basic starter to show navigating from one screen to another.
        </Paragraph>
        <Separator />
        <Paragraph text="center">
          This screen uses the same code on Next.js and React Native.
        </Paragraph>
        <Separator />
      </YStack>

      <SheetDemo />
      <SheetOnly />
    </YStack>
  )
}

function SheetDemo() {
  return (
    <>
      <Dialog modal>
        <Dialog.Trigger asChild>
          <Button>
            <Button.Text>Show Dialog</Button.Text>
          </Button>
        </Dialog.Trigger>

        <Adapt when="maxMd" platform="touch">
          <Sheet
            animation="medium"
            zIndex={200000}
            modal
            dismissOnSnapToBottom
            snapPointsMode="fit"
          >
            <Sheet.Frame padding="$4" gap="$4">
              <Adapt.Contents />
            </Sheet.Frame>
            <Sheet.Overlay
              backgroundColor="$shadow6"
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>

        <Dialog.Portal>
          <Dialog.Overlay
            key="overlay"
            backgroundColor="$shadow6"
            animateOnly={['transform', 'opacity']}
            animation={[
              'quick',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />

          <Dialog.FocusScope focusOnIdle>
            <Dialog.Content
              bordered
              paddingVertical="$4"
              paddingHorizontal="$6"
              elevate
              borderRadius="$6"
              key="content"
              animateOnly={['transform', 'opacity']}
              animation={[
                'quick',
                {
                  opacity: {
                    overshootClamping: true,
                  },
                },
              ]}
              enterStyle={{ x: 0, y: 20, opacity: 0 }}
              exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
              gap="$4"
            >
              <Dialog.Title>Edit profile</Dialog.Title>
              <Dialog.Description>
                Make changes to your profile here. Click save when you're done.
              </Dialog.Description>

              <Fieldset gap="$4" horizontal>
                <Label width={64} htmlFor="name">
                  Name
                </Label>
                <Input flex={1} id="name" defaultValue="Nate Wienert" />
              </Fieldset>

              <Fieldset gap="$4" horizontal>
                <Label width={64} htmlFor="username">
                  <TooltipSimple label="Pick your favorite" placement="bottom-start">
                    <Paragraph>Food</Paragraph>
                  </TooltipSimple>
                </Label>
              </Fieldset>

              <XStack alignSelf="flex-end" gap="$4">
                <Dialog.Close displayWhenAdapted asChild>
                  <Button theme="accent" aria-label="Close">
                    Save changes
                  </Button>
                </Dialog.Close>
              </XStack>

              <Unspaced>
                <Dialog.Close asChild>
                  <Button position="absolute" right="$3" size="$2" circular icon={X} />
                </Dialog.Close>
              </Unspaced>
            </Dialog.Content>
          </Dialog.FocusScope>
        </Dialog.Portal>
      </Dialog>
    </>
  )
}

function SheetOnly() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onPress={() => setOpen(true)}>
        <Button.Text>Show Sheet</Button.Text>
      </Button>
      <Sheet
        modal={true}
        open={open}
        onOpenChange={setOpen}
        snapPointsMode="fit"
        dismissOnSnapToBottom
        zIndex={100000}
        animation="medium"
      >
        <Sheet.Overlay
          animation="lazy"
          backgroundColor="$shadow6"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Sheet.Frame padding="$4" justifyContent="center" alignItems="center" gap="$5">
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>
            Make changes to your profile here. Click save when you're done.
          </Dialog.Description>

          <Fieldset gap="$4" horizontal>
            <Label width={64} htmlFor="name">
              Name
            </Label>
            <Input flex={1} id="name" defaultValue="Nate Wienert" />
          </Fieldset>

          <Fieldset gap="$4" horizontal>
            <Label width={64} htmlFor="username">
              <TooltipSimple label="Pick your favorite" placement="bottom-start">
                <Paragraph>Food</Paragraph>
              </TooltipSimple>
            </Label>
          </Fieldset>

          <XStack alignSelf="flex-end" gap="$4">
            <Dialog.Close displayWhenAdapted asChild>
              <Button theme="accent" aria-label="Close">
                Save changes
              </Button>
            </Dialog.Close>
          </XStack>
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
