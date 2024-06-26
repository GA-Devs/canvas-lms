/*
 * Copyright (C) 2018 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import I18nStubber from '@canvas/test-utils/I18nStubber'
import {prepareFormats} from '../configureDateTimeMomentParser'

describe('Moment formats', () => {
  beforeEach(() => {
    I18nStubber.pushFrame()
    I18nStubber.setLocale('test')
    I18nStubber.stub('test', {
      'date.formats.medium': '%b %-d, %Y',
      'date.formats.short': '%b %-d',
      'time.formats.tiny': '%l:%M%P',
      'time.formats.tiny_on_the_hour': '%l%P',
      'time.event': '%{date} event %{time}',
    })
  })

  afterEach(() => {
    I18nStubber.clear()
  })

  test('formatsForLocale include formats matching datepicker', () => {
    const formats = prepareFormats().map(x => x())
    expect(formats).toContain('%b %-d, %Y %l:%M%P')
    expect(formats).toContain('%b %-d, %Y %l%P')
  })

  test('formatsForLocale includes all event formats', () => {
    const formats = prepareFormats().map(x => x())
    expect(formats).toContain('%b %-d, %Y event %l:%M%P')
    expect(formats).toContain('%b %-d event %l:%M%P')
    expect(formats).toContain('%b %-d, %Y event %l%P')
    expect(formats).toContain('%b %-d, %Y event %l%P')
  })
})
