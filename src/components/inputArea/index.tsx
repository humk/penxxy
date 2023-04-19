import { useState, useRef, useMemo } from 'react';
import Taro from '@tarojs/taro';
import { View, Button, Textarea, Image } from '@tarojs/components';
import voiceImg from '@/public/images/voice.svg';
import keyboardImg from '@/public/images/keyboard.svg';
import './index.less';

export default function InputArea({
  onKeyboardHeightChange,
  onConfirm,
  loading,
}) {
  const [value, setValue] = useState<string>('图片：a dog wearing a hat');
  const [isRecording, setIsRecording] = useState(false);
  const [inputMode, setInputMode] = useState('text');
  const [isCanceling, setIsCanceling] = useState(false);
  const pageData = useRef({ isCanceled: false });

  const handleTouchStart = () => {
    setIsCanceling(false);
    if (inputMode === 'voice') {
      pageData.current.isCanceled = false;
      setIsRecording(true);
      const recorderManager = Taro.getRecorderManager();
      recorderManager.start({
        duration: 180000,
        sampleRate: 16000,
        numberOfChannels: 1,
        encodeBitRate: 44100,
        frameSize: 2,
        format: 'mp3',
      });
      recorderManager.onStop((res) => {
        if (pageData.current?.isCanceled) {
          return;
        }
        const { tempFilePath } = res;
        if (tempFilePath) {
          onConfirm({ type: 'voice', value: tempFilePath });
        } else {
          Taro.showToast({
            title: '录音失败，请稍后重试',
            duration: 1000,
          });
        }
      });
    }
  };

  function handleTouchEnd() {
    if (inputMode === 'voice') {
      const recorderManager = Taro.getRecorderManager();
      recorderManager.stop();
    }
    setIsRecording(false);
    setTimeout(() => {
      setIsCanceling(false);
    }, 100);
  }

  function handleTouchMove(e) {
    const query = Taro.createSelectorQuery();
    query
      .select('#input-voice')
      .boundingClientRect()
      .exec((res) => {
        const { clientX, clientY } = e.touches[0];
        const { top, bottom, left, right } = res?.[0] || {};
        const isOutside =
          clientX < left ||
          clientX > right ||
          clientY < top ||
          clientY > bottom;
        pageData.current.isCanceled = isOutside;
        setIsCanceling(isOutside);
      });
  }

  const handleInputModeChange = () => {
    setIsRecording(false);
    setInputMode((pre) => {
      if (pre === 'text') {
        return 'voice';
      } else {
        return 'text';
      }
    });
  };

  const inputBlock = useMemo(() => {
    return (
      <Textarea
        className="input"
        value={value}
        fixed
        showConfirmBar={false}
        // confirmType="send"
        adjustPosition={false}
        disableDefaultPadding
        autoHeight
        maxlength={-1}
        onInput={(e) => {
          setValue(e.detail.value);
        }}
        cursorSpacing={30}
        onKeyboardHeightChange={onKeyboardHeightChange}
      />
    );
  }, [onKeyboardHeightChange, value]);
  return (
    <View className="input-area">
      <Image
        className="switch-img"
        onClick={handleInputModeChange}
        src={inputMode === 'voice' ? keyboardImg : voiceImg}
      />
      {inputMode === 'voice' ? (
        <View className="input-voice" id="input-voice">
          <Button
            className="input-voice-btn"
            onTouchMove={handleTouchMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {isRecording ? '松开 发送' : '按住 说话'}
          </Button>
          {isCanceling && (
            <View
              className="cancel-mask"
              onClick={() => {
                setIsCanceling(false);
              }}
            >
              <View className="cancel-text">取消</View>
            </View>
          )}
        </View>
      ) : (
        <View className="input-text">
          {inputBlock}
          <View
            className="btn"
            onClick={() => {
              if (loading) {
                return;
              }
              setValue('');
              onConfirm({ type: 'text', value });
            }}
          >
            发送
          </View>
        </View>
      )}
    </View>
  );
}
