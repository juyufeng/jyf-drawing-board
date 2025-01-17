<template>
  <div
    id="drawingboard"
    style="background-color: transparent; overflow-x: hidden"
  >
    <div v-if="cursorPointerCSSEnable" :style="ShowMousePointerView()">
      <div
        :class="cursorPointerCSS"
        style="width: 60px; height: 60px; border-radius: 60px"
      />
    </div>
    <div>
      <div id="canvasDiv" class="canvasDiv">
        <!-- 弹出层 -->
        <div
          class="ClearBackground"
          v-if="showUserLoginView || showNoNetView || showPay || showIntroduce"
        >
          <Introduce
            v-if="showIntroduce"
            @closeIntroduceView="showIntroduce = false"
          />
          <LoginView
            v-if="showUserLoginView"
            :loading="loginLoading"
            @clickLogin="clickLogin"
          />
          <Nonet v-if="showNoNetView" />
          <Pay v-if="showPay" @closePage="showPay = false" />
        </div>
        <!-- 主体层 -->
        <div
          class="ClearBackground"
          v-show="
            !showUserLoginView && !showNoNetView && !showPay && !showIntroduce
          "
        >
          <!-- canvs -->
          <canvas id="c" :width="www" :height="hhh"
            >请使用支持HTML5的浏览器
          </canvas>
          <MacTop
            v-if="showMacTop"
            style="top: 0px; left: 0; position: absolute"
          />
          <FlowTestBand
            v-if="showTest"
            :test="{
              options,
              clientMessage,
              mouseDidDown,
              mouseFrom,
              cursorPointer,
              mouseDidMove,
              cacheCurrentKeyboardKeys,
            }"
            style="top: 0px; left: 0; position: absolute"
          />
          <!-- toolBar工具栏 -->
          <transition name="fade">
            <div
              :style="toolBarCss"
              v-show="
                showToolBar || cacheCurrentShowToolBarModel === '显示模式'
              "
            >
              <div v-for="(item, index) in toolArray" :key="index">
                <flowboard
                  :style="!item.enable && 'display:none;'"
                  @LeftSqClick="LeftSqClick(item, index)"
                  @MiddleSqClick="MiddleSqClick(item, index)"
                  :isSelected="item.isSelected"
                  :baseWidth="item.baseWidth"
                  :baseHeight="item.baseHeight"
                  :originBaseColor="item.originBaseColor"
                  :coverBaseColor="item.coverBaseColor"
                  :selectedBaseColor="item.selectedBaseColor"
                  :middleIconNameOrUrl="item.middleIconNameOrUrl"
                  :middleIconDotShow="item.middleIconDotShow"
                  :middleIconBadge="item.middleIconBadge"
                  :middleIconColor="item.middleIconColor"
                  :middleIconSizePx="item.middleIconSizePx"
                  :leftSqShow="item.leftSqShow"
                  :leftSqWidth="item.leftSqWidth"
                  :leftSqBaseColor="item.leftSqBaseColor"
                  :leftSqCoverColor="item.leftSqCoverColor"
                  :leftSqInnerIconUrl="item.leftSqInnerIconUrl"
                  :topBarHeightPx="item.topBarHeightPx"
                  :topBarBaseColor="item.topBarBaseColor"
                  :topBarCoverColor="item.topBarCoverColor"
                  :leftBarHeightPx="item.leftBarHeightPx"
                  :leftBarBaseColor="item.leftBarBaseColor"
                  :leftBarCoverColor="item.leftBarCoverColor"
                  :bottomBarHeightPx="item.bottomBarHeightPx"
                  :bottomBarBaseColor="item.bottomBarBaseColor"
                  :bottomBarCoverColor="item.bottomBarCoverColor"
                  :rightBarHeightPx="item.rightBarHeightPx"
                  :rightBarBaseColor="item.rightBarBaseColor"
                  :rightBarCoverColor="item.rightBarCoverColor"
                />
              </div>
            </div>
          </transition>
        </div>
      </div>
      <van-popup
        v-model:show="showPopup"
        position="right"
        round
        :style="{ height: '80%', width: '375px' }"
        @close="closePopup"
      >
        <div
          v-if="currentLeftSqClickIndex !== undefined"
          style="margin-left: 10px; margin-right: 10px"
        >
          <div
            style="
              width: 100%;
              text-align: center;
              font-size: 18px;
              color: #ff4d4d;
              font-weight: 500;
              margin-top: 15px;
              margin-bottom: 15px;
            "
          >
            夸克画板
            <span style="color: black; color: gray; font-size: 12px"
              >[设置{{
                toolArray[currentLeftSqClickIndex].name !== "设置"
                  ? toolArray[currentLeftSqClickIndex].name
                  : ""
              }}]</span
            >
          </div>

          <van-notice-bar
            v-if="
              toolArray[currentLeftSqClickIndex].hasOwnProperty('StateDrawInfo')
            "
            wrapable
            :mode="toolArray[currentLeftSqClickIndex].StateDrawMode"
            color="#1989fa"
            background="#ecf9ff"
            left-icon="info-o"
          >
            {{ toolArray[currentLeftSqClickIndex].StateDrawInfo }}
          </van-notice-bar>

          <!-- 广告图片+URL -->
          <div
            v-if="toolArray[currentLeftSqClickIndex].hasOwnProperty('AdName')"
          >
            <div
              style="
                background-color: rgb(245, 245, 245);
                width: 100%;
                height: 200px;
              "
            >
              <div style="cursor: pointer" @click="ClickAdBand()">
                <!-- 判断跳转本地 或者 跳转URL -->
                <img
                  style="object-fit: fill; pointer-events: none"
                  width="100%"
                  height="200px"
                  :src="toolArray[currentLeftSqClickIndex].AdImageUrl"
                />
              </div>
            </div>
          </div>

          <!-- KeyValues -->
          <div
            v-if="
              toolArray[currentLeftSqClickIndex].hasOwnProperty('KeyValues')
            "
          >
            <div style="margin-top: 10px; font-size: 16px; margin-bottom: 5px">
              {{ toolArray[currentLeftSqClickIndex].KVTitle }}
            </div>
            <div v-if="toolArray[currentLeftSqClickIndex].KeyValues.length > 0">
              <div
                :key="iii"
                v-for="(kv, iii) in toolArray[currentLeftSqClickIndex]
                  .KeyValues"
              >
                <div class="KeyValueBar">
                  <div style="width: 100px">
                    <span v-html="kv.k" />
                  </div>
                  <div>
                    <span v-html="kv.v" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 工具栏格子的尺寸 -->
          <div
            v-if="
              toolArray[currentLeftSqClickIndex].hasOwnProperty(
                'ToolSqSizeRate'
              )
            "
          >
            <van-field label="工具栏尺寸">
              <template #input>
                <van-slider
                  style="width: 135px"
                  min="35"
                  max="60"
                  bar-height="4px"
                  active-color="#ff4d4d"
                  v-model="toolArray[currentLeftSqClickIndex].ToolSqSizeRate"
                />
                <van-stepper
                  integer
                  style="margin-left: 10px"
                  min="35"
                  max="60"
                  button-size="18"
                  v-model="toolArray[currentLeftSqClickIndex].ToolSqSizeRate"
                />
              </template>
            </van-field>
          </div>

          <!-- 工具栏仅在鼠标移入时显示 -->
          <div
            v-if="
              toolArray[currentLeftSqClickIndex].hasOwnProperty(
                'OlnyShowByCursorIns'
              )
            "
          >
            <div class="itemFlexBar">
              <div>工具栏仅在鼠标移入时显示</div>
              <div>
                <van-checkbox-group
                  style="margin-left: 42px"
                  v-model="
                    toolArray[currentLeftSqClickIndex].OlnyShowByCursorIn
                  "
                  direction="horizontal"
                >
                  <van-checkbox
                    :key="k"
                    v-for="(tab, k) in toolArray[currentLeftSqClickIndex]
                      .OlnyShowByCursorIns"
                    :name="tab"
                    checked-color="#ff4d4d"
                    @click="clickOlnyShowByCursorIn(tab)"
                    >{{ tab }}</van-checkbox
                  >
                </van-checkbox-group>
              </div>
            </div>
          </div>

          <!-- 元素类型 -->
          <div
            v-if="
              toolArray[currentLeftSqClickIndex].hasOwnProperty('StateDrawType')
            "
          >
            <div class="itemFlexBar">
              <div>元素类型</div>

              <div>
                <van-checkbox-group
                  style="margin-left: 42px"
                  v-model="toolArray[currentLeftSqClickIndex].StateDrawType"
                  direction="horizontal"
                >
                  <van-checkbox
                    :key="k"
                    v-for="(tab, k) in toolArray[currentLeftSqClickIndex]
                      .StateDrawTypes"
                    :name="tab"
                    checked-color="#ff4d4d"
                    @click="
                      toolArray[currentLeftSqClickIndex].StateDrawType = [tab];
                      toolArray[currentLeftSqClickIndex].name = tab;
                    "
                    >{{ tab }}</van-checkbox
                  >
                </van-checkbox-group>
              </div>
            </div>

            <van-divider style="margin: 0" />
          </div>

          <!-- 线条端点 -->
          <div
            v-if="
              toolArray[currentLeftSqClickIndex].hasOwnProperty(
                'StateDrawLineCaps'
              )
            "
          >
            <div class="itemFlexBar">
              <!-- <van-field  label="线条端点"> -->
              <div>线条端点</div>
              <div>
                <van-checkbox-group
                  style="margin-left: 42px"
                  v-model="toolArray[currentLeftSqClickIndex].StateDrawLineCap"
                  direction="horizontal"
                >
                  <van-checkbox
                    :key="k"
                    v-for="(tab, k) in toolArray[currentLeftSqClickIndex]
                      .StateDrawLineCaps"
                    :name="tab"
                    checked-color="#ff4d4d"
                    @click="
                      toolArray[currentLeftSqClickIndex].StateDrawLineCap = [
                        tab,
                      ]
                    "
                    >{{ tab }}</van-checkbox
                  >
                </van-checkbox-group>
              </div>
            </div>

            <van-divider style="margin: 0" />
          </div>

          <!-- 边角类型 -->
          <div
            v-if="
              toolArray[currentLeftSqClickIndex].hasOwnProperty(
                'StateDrawCornerTypes'
              )
            "
          >
            <div class="itemFlexBar">
              <div>边角类型</div>
              <div>
                <van-checkbox-group
                  style="margin-left: 42px"
                  v-model="
                    toolArray[currentLeftSqClickIndex].StateDrawCornerType
                  "
                  direction="horizontal"
                >
                  <van-checkbox
                    :key="k"
                    v-for="(tab, k) in toolArray[currentLeftSqClickIndex]
                      .StateDrawCornerTypes"
                    :name="tab.value"
                    checked-color="#ff4d4d"
                    @click="
                      toolArray[currentLeftSqClickIndex].StateDrawCornerType = [
                        tab.value,
                      ]
                    "
                    >{{ tab.name }}</van-checkbox
                  >
                </van-checkbox-group>
              </div>
            </div>
            <van-divider style="margin: 0" />
          </div>

          <!-- 文本字号 -->
          <div
            v-if="
              toolArray[currentLeftSqClickIndex].hasOwnProperty(
                'StateDrawWordFont'
              )
            "
          >
            <van-field label="文本字号">
              <template #input>
                <van-slider
                  style="width: 135px"
                  min="8"
                  max="180"
                  bar-height="4px"
                  active-color="#ff4d4d"
                  v-model="toolArray[currentLeftSqClickIndex].StateDrawWordFont"
                />
                <van-stepper
                  integer
                  style="margin-left: 10px"
                  min="8"
                  max="180"
                  button-size="18"
                  v-model="toolArray[currentLeftSqClickIndex].StateDrawWordFont"
                />
              </template>
            </van-field>
          </div>

          <!-- 文本颜色 -->
          <div
            v-if="
              toolArray[currentLeftSqClickIndex].hasOwnProperty(
                'StateDrawWordColor'
              )
            "
          >
            <ColorPicker
              ref="wordColorPickerWrapper"
              v-model="toolArray[currentLeftSqClickIndex].StateDrawWordColor"
              :preset-colors="presetColors"
              :palette-key="'wordColorPickerWrapper'"
              :max-palette-colors="maxPaletteColors"
              :showPicker="
                toolArray[currentLeftSqClickIndex].StateDrawWordColorShow
              "
            >
              <template #activator="{ toggle, open }">
                <van-cell-group inset>
                  <van-field
                    v-model="
                      toolArray[currentLeftSqClickIndex].StateDrawWordColor
                    "
                    @focus="open(wordColorPickerWrapper)"
                    center
                    label="文本颜色"
                    placeholder="请选择色值"
                  >
                    <template #button>
                      <van-button
                        round
                        size="mini"
                        :style="
                          bgc(
                            toolArray[currentLeftSqClickIndex]
                              .StateDrawWordColor
                          )
                        "
                        @click="toggle(wordColorPickerWrapper)"
                      ></van-button>
                    </template>
                  </van-field>
                </van-cell-group>
              </template>
            </ColorPicker>
          </div>

          <!-- 线条粗细 -->
          <div
            style="margin-top: 7px; margin-bottom: 7px"
            v-if="
              toolArray[currentLeftSqClickIndex].hasOwnProperty(
                'StateDrawWidth'
              )
            "
          >
            <van-field label="线条粗细">
              <template #input>
                <van-slider
                  style="width: 135px"
                  min="1"
                  max="60"
                  bar-height="4px"
                  active-color="#ff4d4d"
                  v-model="toolArray[currentLeftSqClickIndex].StateDrawWidth"
                  @change="DrawLineDotTypeClick(undefined, true)"
                />
                <van-stepper
                  integer
                  style="margin-left: 10px"
                  min="1"
                  max="60"
                  button-size="18"
                  v-model="toolArray[currentLeftSqClickIndex].StateDrawWidth"
                  @change="DrawLineDotTypeClick(undefined, true)"
                />
              </template>
            </van-field>
          </div>

          <!-- 线条颜色 -->
          <div
            v-if="
              toolArray[currentLeftSqClickIndex].hasOwnProperty(
                'StateDrawLineColor'
              )
            "
          >
            <ColorPicker
              ref="lineColorPickerWrapper"
              v-model="toolArray[currentLeftSqClickIndex].StateDrawLineColor"
              :preset-colors="presetColors"
              palette-key="lineColorPickerWrapper"
              :max-palette-colors="maxPaletteColors"
              :showPicker="
                toolArray[currentLeftSqClickIndex].StateDrawLineColorShow
              "
            >
              <template #activator="{ toggle, open }">
                <van-cell-group inset>
                  <van-field
                    v-model="
                      toolArray[currentLeftSqClickIndex].StateDrawLineColor
                    "
                    @focus="open(lineColorPickerWrapper)"
                    center
                    label="线条颜色"
                    placeholder="请选择色值"
                  >
                    <template #button>
                      <van-button
                        round
                        size="mini"
                        :style="
                          bgc(
                            toolArray[currentLeftSqClickIndex]
                              .StateDrawLineColor
                          )
                        "
                        @click="toggle(lineColorPickerWrapper)"
                      ></van-button>
                    </template>
                  </van-field>
                </van-cell-group>
              </template>
            </ColorPicker>
          </div>

          <!-- 直线/虚线 -->
          <div
            v-if="
              toolArray[currentLeftSqClickIndex].hasOwnProperty(
                'StateDrawLineStyle'
              )
            "
          >
            <div class="itemFlexBar">
              <van-tabs
                type="card"
                color="#E34F51"
                v-model:active="
                  toolArray[currentLeftSqClickIndex].StateDrawLineStyle
                "
                style="width: 100%"
              >
                <van-tab title="设为直线" name="直线"> </van-tab>
                <van-tab title="设为虚线" name="虚线">
                  <div>
                    <van-checkbox-group
                      v-model="
                        toolArray[currentLeftSqClickIndex]
                          .StateDrawLineDotChecked
                      "
                    >
                      <van-cell-group inset>
                        <van-cell
                          v-for="(item, index) in [
                            '等间线X1',

                            '宽间线X2',
                            '宽间线X3',
                            '宽间线X4',

                            '宽虚线X2',
                            '宽虚线X3',
                            '宽虚线X4',
                          ]"
                          clickable
                          :key="index"
                          @click="DrawLineDotTypeClick(item)"
                        >
                          <template #title>
                            <span class="custom-title">{{ item }}</span>
                            <img
                              style="margin-left: 10px"
                              width="160"
                              :src="dotlineList[index]"
                              alt=""
                            />
                          </template>
                          <template #right-icon>
                            <van-checkbox
                              :name="item"
                              checked-color="#ff4d4d"
                            />
                          </template>
                        </van-cell>
                      </van-cell-group>
                    </van-checkbox-group>
                  </div>
                </van-tab>
              </van-tabs>
            </div>
          </div>

          <!-- 填充颜色 -->
          <div
            v-if="
              toolArray[currentLeftSqClickIndex].hasOwnProperty(
                'StateDrawContainerColor'
              )
            "
          >
            <ColorPicker
              ref="containerColorPickerWrapper"
              v-model="
                toolArray[currentLeftSqClickIndex].StateDrawContainerColor
              "
              :preset-colors="presetColors"
              palette-key="containerColorPickerWrapper"
              :max-palette-colors="maxPaletteColors"
              :showPicker="
                toolArray[currentLeftSqClickIndex].StateDrawContainerColorShow
              "
            >
              <template #activator="{ toggle, open }">
                <van-cell-group inset>
                  <van-field
                    v-model="
                      toolArray[currentLeftSqClickIndex].StateDrawContainerColor
                    "
                    @focus="open(containerColorPickerWrapper)"
                    center
                    label="填充颜色"
                    placeholder="请选择色值"
                  >
                    <template #button>
                      <van-button
                        round
                        size="mini"
                        :style="
                          bgc(
                            toolArray[currentLeftSqClickIndex]
                              .StateDrawContainerColor
                          )
                        "
                        @click="toggle(containerColorPickerWrapper)"
                      ></van-button>
                    </template>
                  </van-field>
                </van-cell-group>
              </template>
            </ColorPicker>
          </div>

          <!-- 排序 -->
          <div
            v-if="toolArray[currentLeftSqClickIndex].name === '排序和快捷键'"
            style="font-size: 14px; padding-bottom: 5px; width: 100%"
          >
            <div
              :key="barIndex"
              v-for="(bar, barIndex) in toolArray"
              style="display: flex; flex-direction: row; padding: 3px"
            >
              <div style="margin-right: 5px">
                <flowboard
                  :isSelected="false"
                  :baseWidth="bar.baseWidth"
                  :baseHeight="bar.baseHeight"
                  :originBaseColor="bar.originBaseColor"
                  :coverBaseColor="bar.coverBaseColor"
                  :selectedBaseColor="bar.selectedBaseColor"
                  :middleIconNameOrUrl="bar.middleIconNameOrUrl"
                  :middleIconDotShow="bar.middleIconDotShow"
                  :middleIconBadge="bar.middleIconBadge"
                  :middleIconColor="bar.middleIconColor"
                  :middleIconSizePx="bar.middleIconSizePx"
                  :leftSqShow="bar.leftSqShow"
                  :leftSqWidth="bar.leftSqWidth"
                  :leftSqBaseColor="bar.leftSqBaseColor"
                  :leftSqCoverColor="bar.leftSqCoverColor"
                  :leftSqInnerIconUrl="bar.leftSqInnerIconUrl"
                  :topBarHeightPx="bar.topBarHeightPx"
                  :topBarBaseColor="bar.topBarBaseColor"
                  :topBarCoverColor="bar.topBarCoverColor"
                  :leftBarHeightPx="bar.leftBarHeightPx"
                  :leftBarBaseColor="bar.leftBarBaseColor"
                  :leftBarCoverColor="bar.leftBarCoverColor"
                  :bottomBarHeightPx="bar.bottomBarHeightPx"
                  :bottomBarBaseColor="bar.bottomBarBaseColor"
                  :bottomBarCoverColor="bar.bottomBarCoverColor"
                  :rightBarHeightPx="bar.rightBarHeightPx"
                  :rightBarBaseColor="bar.rightBarBaseColor"
                  :rightBarCoverColor="bar.rightBarCoverColor"
                />
              </div>
              <div
                :style="
                  `
                  display: flex;
                  flex-direction: column;
                  border-width: 1px;
                  border-color: rgb(128, 128, 128);
                  border-style: solid;
                  background-color:${bar.SortSelected? 'rgb(255,255,240);': 'white' }
                  `
                "
              >
                <!-- 排序操作组 -->
                <div
                  style="margin-left: 18px; display: flex; flex-direction: row"
                >
                  <div
                    v-if="barIndex !== 0"
                    @click="clickGoUp(bar, barIndex)"
                    style="
                      margin-right: 5px;
                      color: rgb(238, 91, 85);
                      cursor: pointer;
                    "
                  >
                    [上移]
                  </div>
                  <div
                    v-if="barIndex === 0"
                    style="margin-right: 5px; color: gray"
                  >
                    [上移]
                  </div>
                  <div
                    v-if="barIndex !== toolArray.length - 1"
                    @click="clickGoDown(bar, barIndex)"
                    style="
                      margin-right: 5px;
                      color: rgb(238, 91, 85);
                      cursor: pointer;
                    "
                  >
                    [下移]
                  </div>
                  <div
                    v-if="barIndex === toolArray.length - 1"
                    style="margin-right: 5px; color: gray"
                  >
                    [下移]
                  </div>
                  <div
                    v-if="barIndex !== 0"
                    @click="clickToTop(bar, barIndex)"
                    style="
                      margin-right: 5px;
                      color: rgb(238, 91, 85);
                      cursor: pointer;
                    "
                  >
                    [置顶]
                  </div>
                  <div
                    v-if="barIndex === 0"
                    style="margin-right: 5px; color: gray"
                  >
                    [置顶]
                  </div>
                  <div
                    v-if="barIndex !== toolArray.length - 1"
                    @click="clickToButtom(bar, barIndex)"
                    style="
                      margin-right: 5px;
                      color: rgb(238, 91, 85);
                      cursor: pointer;
                    "
                  >
                    [置底]
                  </div>
                  <div
                    v-if="barIndex === toolArray.length - 1"
                    style="margin-right: 5px; color: gray"
                  >
                    [置底]
                  </div>
                  <div style="margin-right: 5px">
                    <van-checkbox
                      :disabled="
                        toolArray[barIndex].name === '排序和快捷键' ||
                        toolArray[barIndex].name === '自由划线'
                      "
                      v-model="toolArray[barIndex].enable"
                      shape="square"
                      checked-color="rgb(238,91,85)"
                      icon-size="14"
                    >
                      <span style="color: red; font-size: 14px"
                        >显示</span
                      ></van-checkbox
                    >
                  </div>
                </div>
                <!-- 快捷键组 -->
                <div>
                  <span v-if="bar.keyboardKeyLock" style="margin-left: 16px">{{
                    osTag + (bar.keyboardKeyLock ? bar.keyboardKey : "")
                  }}</span>
                  <van-field
                    v-if="!bar.keyboardKeyLock"
                    label-width="120px"
                    style="width: 270px"
                    v-model="bar.keyboardKey"
                    :disabled="bar.keyboardKeyLock"
                    maxlength="1"
                    :label="
                      '快捷键' + (bar.keyboardKeyLock ? bar.keyboardKey : '')
                    "
                    :placeholder="bar.keyboardKeyLock ? '' : '输入按键'"
                  />
                  <van-button
                    style="
                      margin-left: 16px;
                      color: black;
                      background-color: white;
                    "
                    @click="clickSortKeyChange(bar, barIndex)"
                    size="mini"
                    :type="bar.keyboardKeyLock ? 'primary' : 'danger'"
                  >
                    <span style="font-size: 12px">{{
                      bar.keyboardKeyLock ? "修改" : "确认"
                    }}</span>
                  </van-button>
                </div>
              </div>
            </div>
          </div>

          <!-- 指针提示光标-启用状态 -->
          <div
            v-if="
              toolArray[currentLeftSqClickIndex].hasOwnProperty(
                'CursorPointerEnableTag'
              )
            "
          >
            <div class="itemFlexBar">
              <div>启用状态</div>

              <div>
                <van-checkbox-group
                  style="margin-left: 42px"
                  v-model="
                    toolArray[currentLeftSqClickIndex].CursorPointerEnableTag
                  "
                  direction="horizontal"
                >
                  <van-checkbox
                    style="margin-bottom: 10px"
                    :key="k"
                    v-for="(tab, k) in toolArray[currentLeftSqClickIndex]
                      .CursorPointerEnableTags"
                    :name="tab"
                    checked-color="#ff4d4d"
                    @click="checkCursorPointerEnableTag(tab)"
                    >{{ tab }}</van-checkbox
                  >
                </van-checkbox-group>
              </div>
            </div>

            <van-divider style="margin: 0" />
          </div>

          <!-- 指针提示光标 -->
          <div
            v-if="
              toolArray[currentLeftSqClickIndex].hasOwnProperty(
                'CursorPointerEnableTag'
              )
            "
          >
            <div
              v-show="
                toolArray[currentLeftSqClickIndex].CursorPointerEnableTag[0] ===
                '启用'
              "
            >
              <div class="itemFlexBar">
                <div>指针提示光标</div>

                <div>
                  <van-checkbox-group
                    style="margin-left: 42px"
                    v-model="
                      toolArray[currentLeftSqClickIndex].CursorPointerType
                    "
                    direction="horizontal"
                  >
                    <div style="display: flex; flex-direction: column">
                      <van-checkbox
                        style="margin-bottom: 10px"
                        :key="k"
                        v-for="(tab, k) in toolArray[currentLeftSqClickIndex]
                          .CursorPointerTypes"
                        :name="tab"
                        checked-color="#ff4d4d"
                        @click="checkCursorPointer(tab)"
                        >{{ tab }}</van-checkbox
                      >
                    </div>
                  </van-checkbox-group>
                </div>
              </div>

              <div
                v-if="
                  toolArray[currentLeftSqClickIndex].CursorPointerType[0] !==
                  '小心心'
                "
                class="itemFlexBar"
              >
                <div>呼吸频率</div>

                <div>
                  <van-checkbox-group
                    style="margin-left: 42px"
                    v-model="toolArray[currentLeftSqClickIndex].CursorFlashType"
                    direction="horizontal"
                  >
                    <div style="display: flex; flex-direction: column">
                      <van-checkbox
                        style="margin-bottom: 10px"
                        :key="k"
                        v-for="(tab, k) in toolArray[currentLeftSqClickIndex]
                          .CursorFlashTypes"
                        :name="tab"
                        checked-color="#ff4d4d"
                        @click="checkCursorFlashPointer(tab)"
                        >{{ tab }}</van-checkbox
                      >
                    </div>
                  </van-checkbox-group>
                </div>
              </div>

              <van-divider style="margin: 0" />
            </div>
          </div>

          <!-- 下载图片类型 -->
          <div
            v-if="
              toolArray[currentLeftSqClickIndex].hasOwnProperty(
                'DownloaderType'
              )
            "
          >
            <div class="itemFlexBar">
              <div>文件类型</div>

              <div>
                <van-checkbox-group
                  style="margin-left: 42px"
                  v-model="toolArray[currentLeftSqClickIndex].DownloaderType"
                  direction="horizontal"
                >
                  <div style="display: flex; flex-direction: column">
                    <van-checkbox
                      style="margin-bottom: 10px"
                      :key="k"
                      v-for="(tab, k) in toolArray[currentLeftSqClickIndex]
                        .DownloaderTypes"
                      :name="tab"
                      checked-color="#ff4d4d"
                      @click="checkDownloader(tab)"
                      >{{ tab }}</van-checkbox
                    >
                  </div>
                </van-checkbox-group>
              </div>
            </div>

            <van-divider style="margin: 0" />
          </div>

          <!-- 退出登录 -->
          <div
            v-if="toolArray[currentLeftSqClickIndex].hasOwnProperty('LogOut')"
          >
            <van-button
              style="width: 100%; margin-top: 20px"
              @click="clickLoginOut"
              type="default"
              >退出登录</van-button
            >
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
import {
  SidebarItem,
  Sidebar,
  Popup,
  CellGroup,
  Field,
  Button,
  Slider,
  Stepper,
  Icon,
  Tabs,
  Tab,
  Checkbox,
  CheckboxGroup,
  Cell,
  NoticeBar,
  Divider,
} from "vant";
import LoginView from "@/pages/login/index";
import Nonet from "@/pages/nonet/index";
import Pay from "@/pages/pay/index";
import Introduce from "@/pages/introduce/index";
import FlowTestBand from "@/pages/test/flowTestBand";
import MacTop from "@/pages/top/macTop";

// Mixins🔽
import Ad from "@/pages/drawingboard/mixin/Ad.js";
import ColorChoose from "@/pages/drawingboard/mixin/ColorChoose.js";
import CursorPointer from "@/pages/drawingboard/mixin/CursorPointer.js";
import ClientMessage from "@/pages/drawingboard/mixin/ClientMessage.js";
import Dotline from "@/pages/drawingboard/mixin/Dotline.js";
import Downloader from "@/pages/drawingboard/mixin/Downloader.js";
import IntroduceMix from "@/pages/drawingboard/mixin/Introduce.js";
import Login from "@/pages/drawingboard/mixin/Login.js";
import MacTopMix from "@/pages/drawingboard/mixin/MacTop.js";
import NetEvement from "@/pages/drawingboard/mixin/NetEvement.js";
import PayMix from "@/pages/drawingboard/mixin/Pay.js";
import Settings from "@/pages/drawingboard/mixin/Settings.js";
import SortTool from "@/pages/drawingboard/mixin/SortTool.js";
import StepOpration from "@/pages/drawingboard/mixin/StepOpration.js";
import FlowTestBandMix from "@/pages/drawingboard/mixin/test.js";
import ToolBar from "@/pages/drawingboard/mixin/ToolBar.js";
// Mixins🔼
import flowboard from "@/components/flowboard/flowboardindex";
import { ZipifyColorPicker, ColorModel } from "@/components/jyf-color-picker";

export default {
  mixins: [
    Ad,
    ColorChoose,
    CursorPointer,
    ClientMessage,
    Dotline,
    Downloader,
    IntroduceMix,
    Login,
    MacTopMix,
    NetEvement,
    PayMix,
    Settings,
    SortTool,
    StepOpration,
    FlowTestBandMix,
    ToolBar,
  ],
  components: {
    MacTop,
    FlowTestBand,
    Introduce,
    Nonet,
    LoginView,
    Pay,
    ColorPicker: ZipifyColorPicker,
    ColorModel,
    [NoticeBar.name]: NoticeBar,
    [CheckboxGroup.name]: CheckboxGroup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Checkbox.name]: Checkbox,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [SidebarItem.name]: SidebarItem,
    [Sidebar.name]: Sidebar,
    [Popup.name]: Popup,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button,
    [Slider.name]: Slider,
    [Stepper.name]: Stepper,
    [Icon.name]: Icon,
    [Divider.name]: Divider,
    flowboard,
  },
  data() {
    return {
      operateList: [],
      pointer: -1,
      deep: 50,

      showOpButton: false,

      config: {
        height: 1080, //默认画板高、宽
        width: 1920,
        canvasParentId: "canvasDiv",
        canvasId: "c",
      },
      canvas: undefined,
      zoom: undefined,

      opsModel: {
        hasCanvasObject: false,

        drawingObj: {
          obj: undefined,
          ops: undefined,
          eraserObjs: [],
        },
        drawingObjs: [],

        pointer: -1,
        deep: 20,
      },
      mouseFrom: {
        x: undefined,
        y: undefined,
      },
      cursorPointer: {
        x: undefined,
        y: undefined,
      },
      mouseTo: {},
      textbox: null,
      drawWidth: 6, //笔触宽度

      drawingObject: null, //当前绘制对象
      moveCount: 1, //绘制移动计数器
      mouseDidDown: false, // 绘制状态
      mouseDidMove: false,
      // -------------------------
    };
  },
  computed: {
    hhh() {
      return this.$store.getters.clientHeight || 1080;
    },
    www() {
      return this.$store.getters.clientWidth || 1920;
    },
    clientMessage() {
      return this.$store.getters.receivedMessage;
    },
    osTag() {
      return this.$jyf.OSnow() === "mac"
        ? "快捷键Shift+Option+"
        : "快捷键Shift+Alt+";
    },
  },
  mounted() {
    //初始化
    this.canvas = new fabric.Canvas("c", {
      isDrawingMode: true,
      skipTargetFind: true,
      selectable: false,
      selection: false,
    });

    this.zoom = this.zoom ? this.zoom : 1;
    let autoLineIndex = this.toolArray.findIndex((v) => {
      return v.name === "自由划线";
    });
    this.currentMiddleClickedObj = this.toolArray[autoLineIndex];
    this.currentLeftSqClickIndex = autoLineIndex;
    this.currentMiddleSqClickIndex = autoLineIndex;
    this.canvas.freeDrawingBrush.color =
      this.toolArray[autoLineIndex].StateDrawLineColor; //设置自由绘颜色
    this.canvas.freeDrawingBrush.width =
      this.toolArray[autoLineIndex].StateDrawWidth;

    //初次设置画板
    this.setZoom(this.canvas);

    //监听窗体变化
    window.onresize = () => {
      this.setZoom(this.canvas);
    };

    // contextmenu 禁用右键菜单
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });

    this.canvas.on("mouse:down", (options) => {
      let xy = this.transformMouse(options.e.offsetX, options.e.offsetY);
      this.mouseFrom.x = xy.x;
      this.mouseFrom.y = xy.y;
      this.mouseDidDown = true;
      // 按下鼠标 toolbar 鼠标事件穿透
      this.ToolStyle();
    });

    this.canvas.on("mouse:up", (options) => {
      let xy = this.transformMouse(options.e.offsetX, options.e.offsetY);
      this.mouseTo.x = xy.x;
      this.mouseTo.y = xy.y;
      this.drawingObject = null;
      this.moveCount = 1;

      this.operateDataIntoPipe();
      this.mouseDidDown = false;
      this.mouseDidMove = false;
      // 按下鼠标 toolbar 鼠标事件取消穿透
      this.ToolStyle();
    });

    this.canvas.on("mouse:move", (options) => {
      this.cursorPointer.x = options.pointer.x;
      this.cursorPointer.y = options.pointer.y;

      if (this.cacheCurrentShowToolBarModel === "隐藏模式") {
        this.showToolBar = this.cursorPointer.x >= this.www - 80;
      }

      if (this.moveCount % 2 && !this.mouseDidDown) {
        //减少绘制频率
        return;
      }
      this.mouseDidMove = true;
      this.moveCount++;
      let xy = this.transformMouse(options.e.offsetX, options.e.offsetY);
      this.mouseTo.x = xy.x;
      this.mouseTo.y = xy.y;
      this.drawing();
    });

    this.canvas.on("selection:created", (e) => {
      if (this.toolArray[this.currentMiddleSqClickIndex].name === "橡皮擦") {
        let currentFuncFrom = "canvas.remove";
        if (e.target._objects) {
          //多选删除
          let etCount = e.target._objects.length;
          for (let etindex = 0; etindex < etCount; etindex++) {
            this.canvas.remove(e.target._objects[etindex]);
          }
          this.operateDataIntoPipe(e.target._objects, currentFuncFrom);
        } else {
          //单选删除
          this.canvas.remove(e.target);
          this.operateDataIntoPipe([e.target], currentFuncFrom);
        }
        this.canvas.discardActiveObject(); //清楚选中框
      }
    });

    // 绑定键盘事件
    this.bindKeyBoard();

    this.drawing();
  },
  methods: {
    setZoom(canvas) {
      let canvasDiv = document.getElementById(this.config.canvasParentId);
      let zoom = 1;
      let eleHeight = canvasDiv.offsetHeight;
      let eleWidth = canvasDiv.offsetWidth;
      let cHeight = canvas.height;
      let cWidth = canvas.width;
      let height = eleHeight > cHeight ? eleHeight : cHeight;
      let width = eleWidth > cWidth ? eleWidth : cWidth;
      if (width > height) {
        //横版
        width = eleWidth;
        height = eleHeight;
        zoom = width / this.config.width;
      } else {
        //竖版
        width = eleWidth;
        height = eleHeight;
        zoom = height / this.config.height;
      }

      canvas.setZoom(zoom);
      canvas.setWidth(width);
      canvas.setHeight(height);

      this.zoom = zoom;
      canvas.renderAll();
    },
    //绘画方法
    drawing() {
      let _this = this;
      if (this.drawingObject) {
        this.canvas.remove(this.drawingObject);
      }
      let canvasObject = null;
      let left = this.mouseFrom.x;
      let top = this.mouseFrom.y;

      // 虚线类型
      let Dash = {};
      if (
        _this.toolArray[_this.currentMiddleSqClickIndex].hasOwnProperty(
          "StateDrawLineStyle"
        )
      ) {
        Dash =
          _this.toolArray[_this.currentMiddleSqClickIndex]
            .StateDrawLineStyle === "直线"
            ? {}
            : {
                strokeDashArray:
                  _this.toolArray[_this.currentMiddleSqClickIndex]
                    .StateDrawLineDotArray,
              };
      }

      let currentName = _this.toolArray[_this.currentMiddleSqClickIndex].name;
      let HasStateDrawType =
        _this.toolArray[_this.currentMiddleSqClickIndex].hasOwnProperty(
          "StateDrawType"
        );
      if (HasStateDrawType) {
        currentName =
          _this.toolArray[_this.currentMiddleSqClickIndex].StateDrawType[0];
      }

      switch (currentName) {
        case "自由划线": // 自由
          this.canvas.freeDrawingBrush.width =
            _this.toolArray[_this.currentMiddleSqClickIndex].StateDrawWidth;
          this.canvas.freeDrawingBrush.color =
            _this.toolArray[_this.currentMiddleSqClickIndex].StateDrawLineColor;

          break;
        case "箭头":
          canvasObject = new fabric.Path(
            this.drawArrow(
              _this.mouseFrom.x,
              _this.mouseFrom.y,
              _this.mouseTo.x,
              _this.mouseTo.y,
              34,
              34
            ),
            {
              // strokeDashArray: [3, 1],
              stroke:
                _this.toolArray[_this.currentMiddleSqClickIndex]
                  .StateDrawLineColor,
              fill: "rgba(255,255,255,0)",
              strokeWidth:
                _this.toolArray[_this.currentMiddleSqClickIndex].StateDrawWidth,
            }
          );
          break;
        case "直线": //直线
          let lineLineCap =
            _this.toolArray[_this.currentMiddleSqClickIndex]
              .StateDrawLineCap[0] === "圆端"
              ? { strokeLineCap: "round" }
              : {};

          canvasObject = new fabric.Line(
            [
              _this.mouseFrom.x,
              _this.mouseFrom.y,
              _this.mouseTo.x,
              _this.mouseTo.y,
            ],
            {
              ...Dash,
              ...lineLineCap,
              strokeWidth:
                _this.toolArray[_this.currentMiddleSqClickIndex].StateDrawWidth,
              stroke:
                _this.toolArray[_this.currentMiddleSqClickIndex]
                  .StateDrawLineColor,
            }
          );
          break;
        case "圆": //正圆
          let radius =
            Math.sqrt(
              (_this.mouseTo.x - left) * (_this.mouseTo.x - left) +
                (_this.mouseTo.y - top) * (_this.mouseTo.y - top)
            ) / 2;

          canvasObject = new fabric.Circle({
            left,
            top,
            stroke:
              _this.toolArray[_this.currentMiddleSqClickIndex]
                .StateDrawLineColor,
            fill: _this.toolArray[_this.currentMiddleSqClickIndex]
              .StateDrawContainerColor,
            ...Dash,
            radius: radius,
            strokeWidth:
              _this.toolArray[_this.currentMiddleSqClickIndex].StateDrawWidth,
          });
          break;
        case "椭圆": //椭圆
          canvasObject = new fabric.Ellipse({
            left,
            top,
            stroke:
              _this.toolArray[_this.currentMiddleSqClickIndex]
                .StateDrawLineColor,
            fill: _this.toolArray[_this.currentMiddleSqClickIndex]
              .StateDrawContainerColor,
            ...Dash,
            originX: "center",
            originY: "center",
            rx: Math.abs(left - _this.mouseTo.x),
            ry: Math.abs(top - _this.mouseTo.y),
            strokeWidth:
              _this.toolArray[_this.currentMiddleSqClickIndex].StateDrawWidth,
          });
          break;
        case "正方形": //正方形
          let squareHeight = Math.abs(this.mouseTo.y - this.mouseFrom.y);
          canvasObject = new fabric.Rect({
            //画一个正方形
            left,
            top,
            fill: _this.toolArray[_this.currentMiddleSqClickIndex]
              .StateDrawContainerColor,
            width: squareHeight,
            height: squareHeight,
            ...Dash,
            stroke:
              _this.toolArray[_this.currentMiddleSqClickIndex]
                .StateDrawLineColor,
            strokeLineJoin:
              _this.toolArray[_this.currentMiddleSqClickIndex]
                .StateDrawCornerType[0],
            strokeWidth:
              _this.toolArray[_this.currentMiddleSqClickIndex].StateDrawWidth,
            fill: _this.toolArray[_this.currentMiddleSqClickIndex]
              .StateDrawContainerColor,
          });
          break;
        case "矩形": //矩形
          let pathRectangle =
            "M " +
            _this.mouseFrom.x +
            " " +
            _this.mouseFrom.y +
            " L " +
            _this.mouseTo.x +
            " " +
            _this.mouseFrom.y +
            " L " +
            _this.mouseTo.x +
            " " +
            _this.mouseTo.y +
            " L " +
            _this.mouseFrom.x +
            " " +
            _this.mouseTo.y +
            " L " +
            _this.mouseFrom.x +
            " " +
            _this.mouseFrom.y +
            " z";
          canvasObject = new fabric.Path(pathRectangle, {
            left,
            top,
            ...Dash,
            stroke:
              _this.toolArray[_this.currentMiddleSqClickIndex]
                .StateDrawLineColor,
            strokeLineJoin:
              _this.toolArray[_this.currentMiddleSqClickIndex]
                .StateDrawCornerType[0],
            strokeWidth:
              _this.toolArray[_this.currentMiddleSqClickIndex].StateDrawWidth,
            fill: _this.toolArray[_this.currentMiddleSqClickIndex]
              .StateDrawContainerColor,
          });
          //也可以使用fabric.Rect
          break;
        case "直角": //直角三角形
          let pathRightangle =
            "M " +
            _this.mouseFrom.x +
            " " +
            _this.mouseFrom.y +
            " L " +
            _this.mouseFrom.x +
            " " +
            _this.mouseTo.y +
            " L " +
            _this.mouseTo.x +
            " " +
            _this.mouseTo.y +
            " z";
          canvasObject = new fabric.Path(pathRightangle, {
            ...Dash,
            stroke:
              _this.toolArray[_this.currentMiddleSqClickIndex]
                .StateDrawLineColor,
            strokeLineJoin:
              _this.toolArray[_this.currentMiddleSqClickIndex]
                .StateDrawCornerType[0],
            strokeWidth:
              _this.toolArray[_this.currentMiddleSqClickIndex].StateDrawWidth,
            fill: _this.toolArray[_this.currentMiddleSqClickIndex]
              .StateDrawContainerColor,
          });

          break;
        case "等边": //等边三角形
          let height = Math.abs(_this.mouseTo.y - _this.mouseFrom.y);
          canvasObject = new fabric.Triangle({
            top: _this.mouseFrom.y,
            left: _this.mouseFrom.x,
            width: Math.sqrt(Math.pow(height, 2) + Math.pow(height / 2.0, 2)),
            height: height,
            ...Dash,
            strokeLineJoin:
              _this.toolArray[_this.currentMiddleSqClickIndex]
                .StateDrawCornerType[0],
            stroke:
              _this.toolArray[_this.currentMiddleSqClickIndex]
                .StateDrawLineColor,
            strokeWidth:
              _this.toolArray[_this.currentMiddleSqClickIndex].StateDrawWidth,
            fill: _this.toolArray[_this.currentMiddleSqClickIndex]
              .StateDrawContainerColor,
          });
          break;
        case "等腰": //等腰三角形
          canvasObject = new fabric.Triangle({
            top: _this.mouseFrom.y,
            left: _this.mouseFrom.x,
            width: Math.abs(_this.mouseTo.x - _this.mouseFrom.x),
            height: Math.abs(_this.mouseTo.y - _this.mouseFrom.y),
            ...Dash,
            strokeLineJoin:
              _this.toolArray[_this.currentMiddleSqClickIndex]
                .StateDrawCornerType[0],
            stroke:
              _this.toolArray[_this.currentMiddleSqClickIndex]
                .StateDrawLineColor,
            strokeWidth:
              _this.toolArray[_this.currentMiddleSqClickIndex].StateDrawWidth,
            fill: _this.toolArray[_this.currentMiddleSqClickIndex]
              .StateDrawContainerColor,
          });
          break;
        case "isosceles":
          break;
        case "文本":
          this.textbox = new fabric.Textbox("", {
            left: _this.mouseFrom.x - 60,
            top: _this.mouseFrom.y - 20,
            width: 4068,
            fontSize:
              _this.toolArray[_this.currentMiddleSqClickIndex]
                .StateDrawWordFont,
            fill: _this.toolArray[_this.currentMiddleSqClickIndex]
              .StateDrawWordColor,
          });

          this.canvas.add(this.textbox);
          this.textbox.enterEditing();
          // this.textbox.hiddenTextarea.focus();
          break;
        case "橡皮擦":
          break;
        default:
          break;
      }
      if (canvasObject) {
        this.canvas.add(canvasObject);
        this.drawingObject = canvasObject;
      }

      this.setOpsModel(canvasObject ? true : false, canvasObject);
    },
    setOpsModel(hasCanvasObject = false, drawingObj = undefined) {
      this.opsModel.drawingObj = {
        ops: this.toolArray[this.currentMiddleSqClickIndex],
        obj: drawingObj ? drawingObj : undefined,
      };
      this.opsModel.hasCanvasObject = hasCanvasObject;
    },
    //绘制箭头方法
    drawArrow(fromX, fromY, toX, toY, theta, headlen) {
      theta = typeof theta != "undefined" ? theta : 30;
      headlen = typeof theta != "undefined" ? headlen : 10;
      // 计算各角度和对应的P2,P3坐标
      let angle = (Math.atan2(fromY - toY, fromX - toX) * 180) / Math.PI;
      let angle1 = ((angle + theta) * Math.PI) / 180;
      let angle2 = ((angle - theta) * Math.PI) / 180;
      let topX = headlen * Math.cos(angle1);
      let topY = headlen * Math.sin(angle1);
      let botX = headlen * Math.cos(angle2);
      let botY = headlen * Math.sin(angle2);
      let arrowX = fromX - topX;
      let arrowY = fromY - topY;
      let path = " M " + fromX + " " + fromY;
      path += " L " + toX + " " + toY;
      arrowX = toX + topX;
      arrowY = toY + topY;
      path += " M " + arrowX + " " + arrowY;
      path += " L " + toX + " " + toY;
      arrowX = toX + botX;
      arrowY = toY + botY;
      path += " L " + arrowX + " " + arrowY;
      return path;
    },
    //坐标转换
    transformMouse(mouseX, mouseY) {
      return { x: mouseX / this.zoom, y: mouseY / this.zoom };
    },
  },
};
</script>

<style scoped>
@import "./css/index.css";
* {
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.transparentbg {
  background-color: "transparent";
  overflow-x: "hidden";
}

.itemFlexBar {
  display: flex;
  font-size: 14px;
  color: rgb(102, 103, 104);
  padding: 15px;
  align-items: center;
}

@-webkit-keyframes cursorPointerCSS_Red {
  0% {
    background-color: rgba(255, 0, 0, 0);
  }
  40% {
    background-color: rgba(255, 0, 0, 0.7);
  }
  50% {
    background-color: rgba(255, 0, 0, 1);
  }
  60% {
    background-color: rgba(255, 0, 0, 0.7);
  }
  100% {
    background-color: rgba(255, 0, 0, 0);
  }
}

.cursorPointerCSS_Red_Time1 {
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0);
  -webkit-animation-name: cursorPointerCSS_Red;
  -webkit-animation-duration: 1s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
}

.cursorPointerCSS_Red_Time2 {
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0);
  -webkit-animation-name: cursorPointerCSS_Red;
  -webkit-animation-duration: 2s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
}

.cursorPointerCSS_Red_Time4 {
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0);
  -webkit-animation-name: cursorPointerCSS_Red;
  -webkit-animation-duration: 4s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
}

.cursorPointerCSS_Blue_Time1 {
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0);
  -webkit-animation-name: cursorPointerCSS_Blue;
  -webkit-animation-duration: 1s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
}
.cursorPointerCSS_Blue_Time2 {
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0);
  -webkit-animation-name: cursorPointerCSS_Blue;
  -webkit-animation-duration: 2s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
}
.cursorPointerCSS_Blue_Time4 {
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0);
  -webkit-animation-name: cursorPointerCSS_Blue;
  -webkit-animation-duration: 4s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
}

@-webkit-keyframes cursorPointerCSS_Blue {
  0% {
    background-color: rgba(0, 0, 255, 0);
  }
  40% {
    background-color: rgba(0, 0, 255, 0.7);
  }
  50% {
    background-color: rgba(0, 0, 255, 1);
  }
  60% {
    background-color: rgba(0, 0, 255, 0.7);
  }
  100% {
    background-color: rgba(0, 0, 255, 0);
  }
}

.cursorPointerCSS_Yellow_Time1 {
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0);
  -webkit-animation-name: cursorPointerCSS_Yellow;
  -webkit-animation-duration: 1s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
}
.cursorPointerCSS_Yellow_Time2 {
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0);
  -webkit-animation-name: cursorPointerCSS_Yellow;
  -webkit-animation-duration: 2s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
}
.cursorPointerCSS_Yellow_Time4 {
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0);
  -webkit-animation-name: cursorPointerCSS_Yellow;
  -webkit-animation-duration: 4s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
}

@-webkit-keyframes cursorPointerCSS_Yellow {
  0% {
    background-color: rgba(255, 255, 0, 0);
  }
  40% {
    background-color: rgba(255, 255, 0, 0.7);
  }
  50% {
    background-color: rgba(255, 255, 0, 1);
  }
  60% {
    background-color: rgba(255, 255, 0, 0.7);
  }
  100% {
    background-color: rgba(255, 255, 0, 0);
  }
}

.cursorPointerCSS_Heart {
  pointer-events: none;
  position: relative;
  width: 50px;
  height: 40px;
}
/*上一步骤的代码省略...*/
.cursorPointerCSS_Heart:before,
.cursorPointerCSS_Heart:after {
  position: absolute;
  left: 0;
  top: 0;
  content: "";
  width: 25px;
  height: 40px;
  background: red;
  border-radius: 20px 20px 0 0;
}
.cursorPointerCSS_Heart:after {
  content: "";
  left: 25px;
  top: 0;
}
.cursorPointerCSS_Heart:before,
.cursorPointerCSS_Heart:after {
  position: absolute;
  left: 25px;
  top: 0;
  content: "";
  width: 25px;
  height: 40px;
  background: red;
  border-radius: 40px 40px 0 0;
  transform: rotate(-45deg);
  transform-origin: 0 100%;
}
.cursorPointerCSS_Heart:after {
  content: "";
  left: 0;
  top: 0;
  transform: rotate(45deg);
  transform-origin: 100% 100%;
}

.KeyValueBar {
  font-size: 15px;
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  cursor: pointer;
  color: rgb(40, 30, 20);
}
.KeyValueBar:hover {
  background-color: rgb(245, 245, 245);
}

.ClearBackground {
  overflow: hidden;
  background: url(./image/ClearPng.png) repeat;
}
</style>
