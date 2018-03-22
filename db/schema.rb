# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180302073620) do

  create_table "tokens", force: :cascade do |t|
    t.integer  "wallet_id",        limit: 4
    t.string   "contract_address", limit: 255
    t.string   "token_symbol",     limit: 255
    t.integer  "precision",        limit: 4,                             default: 18
    t.decimal  "balance",                      precision: 10, scale: 10, default: 0.0
    t.datetime "created_at",                                                           null: false
    t.datetime "updated_at",                                                           null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "nickname",               limit: 255, default: ""
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "wallets", force: :cascade do |t|
    t.integer  "user_id",          limit: 4
    t.string   "address",          limit: 255
    t.string   "wallet_type",      limit: 255
    t.string   "name",             limit: 255
    t.string   "private_key",      limit: 255
    t.string   "public_key",       limit: 255
    t.decimal  "balance",                      precision: 50, scale: 18, default: 0.0
    t.decimal  "contract_balance",             precision: 50, scale: 18, default: 0.0
    t.datetime "created_at",                                                           null: false
    t.datetime "updated_at",                                                           null: false
  end

  add_index "wallets", ["user_id"], name: "fk_rails_732f6628c4", using: :btree

  add_foreign_key "wallets", "users"
end
