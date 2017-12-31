<template>
  <mt-field
    :class="{
      'field-date-time': true,
      'picked': str
    }"
    :label="label"
    readonly
    :placeholder="placeholder"
    :value="str"
  >
    <mt-datetime-picker
      :close-on-click-modal="false"
      ref="picker"
      type="datetime"
      :value="pickerValue"
      @confirm="emit"
      @cancel="handleCancel"
      :startDate="new Date(minDate)"
      :endDate="new Date(maxDate)"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      hour-format="{value} 时"
      minute-format="{value} 分"
    />
  </mt-field>
</template>

<script>
import { format as formatDate, isValidDate } from '@/date-util'
import { DatetimePicker } from 'mint-ui'
export default {
  components: {
    [DatetimePicker.name]: DatetimePicker
  },
  props: {
    value: {},
    label: {
      type: String
    },
    placeholder: {
      type: String
    },
    minDate: {
      default: Date.now()
    },
    maxDate: {
      default: Date.now() + 365 * 24 * 3600 * 1000
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    str() {
      return isValidDate(this.value) ? formatDate(this.value, 'yyyy-mm-dd HH:MM') : ''
    },
    pickerValue() {
      return isValidDate(this.value) ? new Date(this.value) : new Date()
    }
  },
  methods: {
    emit(v) {
      this.$emit('input', new Date(v).getTime())
    },
    handleCancel() {
      this.$refs.picker.close()
    },
    handleClick(ev) {
      if (!this.readonly) {
        ev.stopPropagation()
        this.$refs.picker.open()
      }
    },
  },
  mounted() {
    this.$el.getElementsByTagName('input')[0].addEventListener('click', this.handleClick)
  },
  beforeDestroy() {
    this.$el.getElementsByTagName('input')[0].removeEventListener('click', this.handleClick)
  }
}
</script>

<style lang="stylus">
.field-date-time
  &.picked
    input
      font-family: monospace
  .placeholder
    user-select: none
    text-decoration: none !important
  // hack mint datetime picker's rim width
  .mint-datetime-picker
    .picker-slot
      &:nth-child(1)    // year
        flex-basis: 6ch !important
      &:nth-child(2)    // month
        flex-basis: 4ch !important
      &:nth-child(3)    // date
        flex-basis: 4ch !important
      &:nth-child(4)    // hour
        flex-basis: 4ch !important
      &:nth-child(5)    // minute
        flex-basis: 4ch !important
</style>