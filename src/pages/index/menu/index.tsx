import { useMemo } from "react";
import {
  View,
  Switch,
  Input,
  Slider,
  Picker,
  Button,
} from "@tarojs/components";
import { menuConfig } from "../indexUtil/define";
import "./index.less";

export default function Menu({
  selectedConfig,
  setSelectedConfig,
  resetConfig,
}) {
  const renderScreen = useMemo(() => {
    return menuConfig.map((item) => {
      if (item.type === "range") {
        const rangeArray = item.range && item.range(selectedConfig?.model);

        return (
          <View className={`box-item ${item.class}`} key={item.key}>
            <View className="name">{item.key}</View>
            <Slider
              step={item.step}
              value={selectedConfig[item.key]}
              showValue
              blockSize={16}
              min={rangeArray?.[0]}
              max={rangeArray?.[1]}
              onChange={(e) => {
                setSelectedConfig((pre) =>
                  Object.assign({}, pre, { [item.key]: e.detail.value })
                );
              }}
            />
          </View>
        );
      } else if (item.type === "input") {
        return (
          <View className={`box-item ${item.class}`} key={item.key}>
            <View className="name">{item.key}</View>
            <Input
              type={item.dataType}
              placeholder="请输入配置信息"
              value={selectedConfig[item.key]}
              onInput={(e) => {
                setSelectedConfig((pre) =>
                  Object.assign({}, pre, {
                    [item.key]: e.detail.value,
                    max_tokens: pre.max_tokens > 2048 ? 2048 : pre.max_tokens,
                  })
                );
              }}
            />
          </View>
        );
      } else if (item.type === "option") {
        return (
          <View className={`box-item ${item.class}`} key={item.key}>
            <View className="name">{item.key}</View>
            <Picker
              mode="selector"
              range={item.options || []}
              value={item.options?.indexOf(selectedConfig[item.key])}
              onChange={(e) => {
                setSelectedConfig((pre) =>
                  Object.assign({}, pre, {
                    [item.key]: item.options?.[e.detail.value],
                    max_tokens: pre.max_tokens > 2048 ? 2048 : pre.max_tokens,
                  })
                );
              }}
            >
              <View className="value">{selectedConfig[item.key]}</View>
            </Picker>
          </View>
        );
      } else if (item.type === "switch") {
        return (
          <View className={`box-item ${item.class}`} key={item.key}>
            <View className="name">{item.key}</View>
            <Switch
              checked={selectedConfig[item.key]}
              onChange={(e) => {
                setSelectedConfig((pre) =>
                  Object.assign({}, pre, { [item.key]: e.detail.value })
                );
              }}
            />
          </View>
        );
      }
    });
  }, [selectedConfig, setSelectedConfig]);

  return (
    <View className="screen-page">
      <View className="screen-box">{renderScreen}</View>
      <Button
        className="reset-button"
        type="primary"
        size="mini"
        onClick={resetConfig}
      >
        重置参数
      </Button>
    </View>
  );
}
