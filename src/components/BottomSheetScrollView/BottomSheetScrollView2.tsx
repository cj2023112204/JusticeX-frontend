import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { forwardRef, useImperativeHandle, useCallback, ReactNode, useState, } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, AnimatedProps, AnimatedScrollViewProps, useAnimatedScrollHandler, runOnJS, } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Gesture, GestureDetector, ScrollView, GestureHandlerStateChangeEvent } from 'react-native-gesture-handler';
import BackDrop from '../BackDrop';


interface Props extends AnimatedProps<AnimatedScrollViewProps> {
  snapTo: string
  backgroundColor: string
  backDropColor: string
  // verdictId: string;
}

export interface BottomSheetMethods {
  expand: () => void;
  close: () => void;
}

const BottomSheetScrollView2 = forwardRef<BottomSheetMethods, Props>(
  ({ snapTo, backgroundColor, backDropColor, children, ...rest }: Props, ref) => {

    const { height } = Dimensions.get('screen');
    const closeHeight = height;
    const percentage = parseFloat(snapTo.replace('%', '')) / 100;
    const openHeight = height - height * percentage;
    const topAnimation = useSharedValue(closeHeight);
    const context = useSharedValue(0);
    const scrollBegin = useSharedValue(0);
    const scrollY = useSharedValue(0);
    const [enableScroll, setEnableScroll] = useState(true);

    const expand = useCallback(() => {
      'worklet';
      topAnimation.value = withTiming(openHeight);
    }, [openHeight, topAnimation]);

    const close = useCallback(() => {
      'worklet';
      topAnimation.value = withTiming(closeHeight);
    }, [closeHeight, topAnimation]);

    useImperativeHandle(
      ref,
      () => ({
        expand,
        close,
      }),
      [expand, close],
    );

    const animationStyle = useAnimatedStyle(() => {
      const top = topAnimation.value;
      return {
        top,
      };
    });

    const pan = Gesture.Pan()
      .onBegin(() => {
        context.value = topAnimation.value;
      })
      .onUpdate(event => {
        if (event.translationY < 0) {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(context.value + event.translationY, {
            damping: 100,
            stiffness: 400,
          });
        }
      })
      .onEnd(() => {
        if (topAnimation.value > openHeight + 50) {
          topAnimation.value = withSpring(closeHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          });
        }
      });

      const onScroll = useAnimatedScrollHandler({
        onBeginDrag: event => {
          scrollBegin.value = event.contentOffset.y
        },
        onScroll: event => {
          scrollY.value = event.contentOffset.y
        },
      })

      const panScroll = Gesture.Pan()
      .onBegin(() => {
        context.value = topAnimation.value;
      })
      .onUpdate(event => {
        if (event.translationY < 0) {
          runOnJS(setEnableScroll)(true);
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else if (event.translationY > 0 && scrollY.value === 0) {
          runOnJS(setEnableScroll)(false);
          topAnimation.value = withSpring(
            Math.max(
              context.value + event.translationY - scrollBegin.value,
              openHeight,
            ),
            {
              damping: 100,
              stiffness: 400,
            },
          );
        }
      })
      .onEnd(() => {
        runOnJS(setEnableScroll)(true);
        if (topAnimation.value > openHeight + 50) {
          topAnimation.value = withSpring(closeHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          });
        }
      });  

      const scrollViewGesture = Gesture.Native()

    return (
      <>
        <BackDrop
          topAnimation={topAnimation}
          closeHeight={closeHeight}
          openHeight={openHeight}
          close={close}
          backDropColor={backDropColor}
        />
        <GestureDetector gesture={pan}>
          <Animated.View style={[
            styles.container,
            animationStyle,
            {
              backgroundColor: backgroundColor,
            },
          ]}>
            <View style={styles.lineContainer}>
              <View style={styles.line} />
            </View>
            <GestureDetector gesture={Gesture.Simultaneous(panScroll, scrollViewGesture)}>
            <Animated.ScrollView
              {...rest}
              scrollEnabled={enableScroll}
              bounces={false}
              scrollEventThrottle={16}
              onScroll={onScroll}
            >
              {children}
            </Animated.ScrollView>
            </GestureDetector>
            
          </Animated.View>
        </GestureDetector>
      </>
    );
  });

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  lineContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  line: {
    width: 50,
    height: 4,
    backgroundColor: 'black',
    borderRadius: 20,
  },
})

export default BottomSheetScrollView2

