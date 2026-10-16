import React from 'react';
import {useVideoConfig} from 'remotion';
import {TransitionSeries,linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {Opening} from './Opening';import {Record} from './Record';import {Overview} from './Overview';import {Goals} from './Goals';import {Closing} from './Closing';
import {MotionViewport} from './shared';
export const Movie=({portrait=false,bottomInset=0}:{portrait?:boolean,bottomInset?:number})=>{const {fps}=useVideoConfig();return <MotionViewport.Provider value={{portrait,bottomInset}}><TransitionSeries>
<TransitionSeries.Sequence durationInFrames={5*fps} premountFor={fps}><Opening/></TransitionSeries.Sequence>
<TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:15})}/>
<TransitionSeries.Sequence durationInFrames={8*fps} premountFor={fps}><Record/></TransitionSeries.Sequence>
<TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:15})}/>
<TransitionSeries.Sequence durationInFrames={7*fps} premountFor={fps}><Overview/></TransitionSeries.Sequence>
<TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:15})}/>
<TransitionSeries.Sequence durationInFrames={7*fps} premountFor={fps}><Goals/></TransitionSeries.Sequence>
<TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:15})}/>
<TransitionSeries.Sequence durationInFrames={5*fps} premountFor={fps}><Closing/></TransitionSeries.Sequence>
</TransitionSeries></MotionViewport.Provider>};
