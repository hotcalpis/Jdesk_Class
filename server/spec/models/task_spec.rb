require 'rails_helper'

RSpec.describe Task, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end

# == Schema Information
#
# Table name: tasks
#
#  id          :bigint           not null, primary key
#  deadline    :date
#  description :text(65535)
#  height      :integer
#  title       :string(255)
#  width       :integer
#  x           :integer
#  y           :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  category_id :bigint
#
# Indexes
#
#  index_tasks_on_category_id  (category_id)
#
# Foreign Keys
#
#  fk_rails_...  (category_id => categories.id)
#
